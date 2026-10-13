import { createFileRoute } from "@tanstack/react-router";
import { conversionEventSchema, verifyConversionSignature } from "@/lib/conversion";

export const Route = createFileRoute("/api/public/conversions")({
  server: { handlers: { POST: async ({ request }) => {
    const secret = process.env["CONVERSION_WEBHOOK_SECRET"];
    if (!secret) return Response.json({ error: "Event intake not configured" }, { status: 503 });
    if (Number(request.headers.get("content-length")) > 4096) return new Response(null, { status: 413 });
    // Bound the streamed body too; Content-Length is not trusted.
    const reader = request.body?.getReader();
    if (!reader) return new Response(null, { status: 400 });
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 4096) { await reader.cancel(); return new Response(null, { status: 413 }); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    const body = new TextDecoder().decode(bytes);
    if (!await verifyConversionSignature(secret, request.headers.get("x-conversion-timestamp"), request.headers.get("x-conversion-signature"), body)) {
      return Response.json({ error: "Invalid signature" }, { status: 401 });
    }
    let input: unknown;
    try { input = JSON.parse(body); } catch { return new Response(null, { status: 400 }); }
    const parsed = conversionEventSchema.safeParse(input);
    if (!parsed.success) return Response.json({ error: "Invalid event" }, { status: 400 });
    const event = parsed.data;
    if (Date.parse(event.occurred_at) > Date.now() + 300_000) return Response.json({ error: "Future event" }, { status: 400 });
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    if (event.click_id) {
      const { data: click, error } = await supabaseAdmin.from("download_clicks").select("id, created_at").eq("id", event.click_id).maybeSingle();
      if (error) return Response.json({ error: "Storage unavailable" }, { status: 503 });
      if (!click || Date.parse(event.occurred_at) < Date.parse(click.created_at) || Date.parse(event.occurred_at) - Date.parse(click.created_at) > 30 * 86400_000) {
        return Response.json({ error: "Invalid attribution; resend with click_id null" }, { status: 422 });
      }
    }
    const { error } = await supabaseAdmin.from("app_conversion_events").insert(event);
    if (error?.code === "23505") return Response.json({ accepted: true, duplicate: true });
    if (error) return Response.json({ error: "Event storage unavailable" }, { status: 503 });
    return Response.json({ accepted: true }, { status: 201 });
  } } },
});