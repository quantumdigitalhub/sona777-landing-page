<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Use the shared MarketCard for homepage market results and provider chart links, so market presentation and chart destinations stay consistent.
- Keep language selection in the shared LanguageProvider and persist it after hydration, so navigation preserves the choice without SSR mismatches.
- Route app-download calls to action to /download; only that page uses APK_URL for the actual file, so installation guidance and missing-file states remain consistent.
- Use the shared WhatsAppSupport control with WHATSAPP_SUPPORT_URL for both placements; missing contacts show an explicit unavailable message instead of opening an invented chat.
- Keep the result API base in RESULTS_BASE_URL, resolve feed paths relative to it and chart paths against its origin, and load public feeds through the shared server function and Query cache; this prevents duplicated API prefixes and keeps domain changes centralized without browser CORS failures.
- Show explicit unavailable states rather than dummy results when provider requests or schema validation fail; this prevents invented numbers from being presented as live results.
- Record CTA IDs before navigation and reuse them for APK attempts; installation references must be explicitly transferred to the app because sideloaded APKs do not inherit browser storage.
- Accept app conversions only through timestamped HMAC-signed backend callbacks, deduplicate installation/account events, and expose placement aggregates only to service-role tooling to protect private analytics.
