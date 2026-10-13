import { z } from "zod";

export const conversionEventSchema = z.object({
  event_id: z.string().uuid(),
  event_type: z.enum(["first_open", "registration"]),
  installation_id: z.string().uuid(),
  click_id: z.string().uuid().nullable().default(null),
  registration_key: z.string().regex(/^[a-f0-9]{64}$/).nullable().default(null),
  occurred_at: z.string().datetime({ offset: true }),
}).strict().superRefine((event, ctx) => {
  if ((event.event_type === "registration") !== (event.registration_key !== null)) {
    ctx.addIssue({ code: "custom", message: "Registration requires a pseudonymous account hash; first open must not include it." });
  }
});

export async function verifyConversionSignature(secret: string, timestamp: string | null, signature: string | null, body: string, now = Date.now()) {
  if (!timestamp || !/^\d{10}$/.test(timestamp) || !signature || !/^[a-f0-9]{64}$/.test(signature)) return false;
  if (Math.abs(now - Number(timestamp) * 1000) > 300_000) return false;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
  const bytes = Uint8Array.from(signature.match(/.{2}/g) ?? [], value => parseInt(value, 16));
  return crypto.subtle.verify("HMAC", key, bytes, encoder.encode(`${timestamp}.${body}`));
}