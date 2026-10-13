import { describe, expect, it } from "vitest";
import { webcrypto } from "node:crypto";
import { conversionEventSchema, verifyConversionSignature } from "@/lib/conversion";

describe("Conversion event validation", () => {
  const event = { event_id: "4b87eddd-fd83-42d5-9b23-e4f14babf579", installation_id: "4b87eddd-fd83-42d5-9b23-e4f14babf580", event_type: "first_open", occurred_at: "2026-10-11T11:30:00Z" };
  it("accepts unattributed first opens, not invented registrations", () => {
    expect(conversionEventSchema.safeParse(event).success).toBe(true);
    expect(conversionEventSchema.safeParse({ ...event, event_type: "registration" }).success).toBe(false);
    expect(conversionEventSchema.safeParse({ ...event, event_type: "registration", registration_key: "a".repeat(64) }).success).toBe(true);
    expect(conversionEventSchema.safeParse({ ...event, email: "not-allowed" }).success).toBe(false);
  });
  it("verifies signed bytes and rejects replays and altered bodies", async () => {
    const secret = "test-only-fixture";
    const now = 1_800_000_000_000;
    const timestamp = String(now / 1000);
    const body = JSON.stringify(event);
    const encoder = new TextEncoder();
    const key = await webcrypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const signed = await webcrypto.subtle.sign("HMAC", key, encoder.encode(`${timestamp}.${body}`));
    const signature = Array.from(new Uint8Array(signed), byte => byte.toString(16).padStart(2, "0")).join("");
    expect(await verifyConversionSignature(secret, timestamp, signature, body, now)).toBe(true);
    expect(await verifyConversionSignature(secret, timestamp, signature, body + " ", now)).toBe(false);
    expect(await verifyConversionSignature(secret, timestamp, signature, body, now + 301_000)).toBe(false);
    expect(await verifyConversionSignature(secret, timestamp, null, body, now)).toBe(false);
  });
});