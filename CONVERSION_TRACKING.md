# Sona 777 conversion tracking — developer handoff

## What is measured

- Website CTA clicks: existing `download_clicks`, now with browser-generated UUID IDs. Attribution uses the latest CTA in the current tab.
- APK download attempts: `apk_download_attempts`, recorded only when the actual APK link is available and tapped. This does **not** prove file completion.
- `first_open`: the first app launch is an installation proxy, not proof of installation before the user launches it.
- `registration`: report only after the trusted app backend successfully creates the account.
- No conversion is fabricated when app callbacks are absent.

## Required Android/backend work

1. Generate and persist a random `installation_id` UUID on first launch. Do not use hardware/advertising identifiers.
2. Add an **optional installation reference** field during onboarding. The website displays the click UUID with a copy control when a real APK is available. Validate the UUID and pass it to your backend; never block onboarding if missing. Persist it with the installation and forward it on registration.
3. A sideload APK does **not** automatically inherit browser cookies, session storage or URL parameters. Do not assume Play Install Referrer works for this direct APK. Manual reference transfer is the current attribution mechanism; users who skip it remain unattributed. Automatic deferred attribution requires a separate agreed distribution/deep-link solution.
4. Backend sends the events below and retries transient failures, reusing `event_id`. First-open should be emitted when first launch is actually observed, not when an APK is requested. Registration must represent account creation, not login or reinstalls.
5. Never embed `CONVERSION_WEBHOOK_SECRET` in the APK, JavaScript, or a public URL. Keep the same shared secret in both trusted backends. The secure secret form already stores the website side.

## Callback contract

POST to `https://sona777-landing.pages.dev/api/public/conversions`. The deployed site still needs `SUPABASE_SERVICE_ROLE_KEY` and `CONVERSION_WEBHOOK_SECRET` configured before callbacks can be accepted. No browser CORS access is provided: this is backend-to-backend.

Headers:
- `Content-Type: application/json`
- `X-Conversion-Timestamp`: current UNIX seconds; refreshed for each retry
- `X-Conversion-Signature`: lowercase hex HMAC-SHA256 of `timestamp + "." + exactRawJsonBody`, using the shared secret

Body (UUIDs below are illustrative, not credentials):
```json
{
  "event_id": "4b87eddd-fd83-42d5-9b23-e4f14babf579",
  "event_type": "first_open",
  "installation_id": "4b87eddd-fd83-42d5-9b23-e4f14babf580",
  "click_id": null,
  "registration_key": null,
  "occurred_at": "2026-10-11T11:30:00Z"
}
```

For registration, set `event_type` to `registration` and `registration_key` to a stable, lowercase 64-character HMAC-SHA256 of your internal account ID, using a separate backend-only analytics salt. Never send emails, phone numbers, names or raw account IDs. Use a fresh event UUID. `click_id` may be a website reference UUID or null. Attribution accepts events from click time through 30 days later. Send null when missing or rejected (422), retaining the same event UUID; it will count as unattributed.

Responses: 201 accepted; 200 duplicate (do not retry); 400 invalid schema; 401 invalid/stale signature; 413 too large; 422 invalid attribution; 503 retry later. Request bodies are capped at 4 KB, signatures expire after five minutes, and duplicate first opens per installation or registrations per account are ignored. Callbacks attest to what the trusted backend reports; they do not independently audit the app's events.

## Private comparison

Use trusted backend tooling to read `public.conversion_placement_report`: per-placement clicks, clicks with a download attempt, clicks with first open, clicks with registration, and the two click-conversion percentages. Visitors cannot read it. Counts use distinct **click journeys**, avoiding rates above 100% due to repeated events. Historical clicks before reference tracking remain in the denominator and cannot be retroactively attributed.

To compare cohorts by date, filter `download_clicks.created_at` in your reporting query and join events by `click_id`; do not mix events received this week with clicks from unrelated weeks. Also report unattributed events separately (`click_id IS NULL`) so missing references are not mistaken for failed conversions. Counts for first open and registration may arrive independently; don't invent first opens for registration-only callbacks.

## Launch checklist

- Supply the real APK URL; website attempts are intentionally disabled until then.
- Publish the website and configure its callback origin and shared secret in the trusted app backend.
- Integrate the reference input and two callbacks; maintain event retry/idempotency.
- Perform a real CTA → APK → first launch → reference entry → registration test, then verify both callbacks in private reporting.
- Respect analytics consent requirements and adopt a retention/deletion policy appropriate to your audience before production collection.

Current status: website recording, private report and signed intake implemented; real app first-open/registration flow is **not yet verified**.
