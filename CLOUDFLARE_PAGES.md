# Cloudflare Pages deployment

This branch (`variant/sona-compact`) contains an alternative Sona777 app download design. The published full page remains on `variant/sona-non-gambling`. The original Sona777 site remains on `main`. The Raja567 informational variant is preserved on `variant/non-gambling`.

This variant includes an app download landing page and `/download` with English/Hindi APK installation guidance. Charts and article URLs return 404. The homepage has a flat layout with one main CTA and the supplied screenshot inside a phone frame on mobile and desktop. There are no live result-provider requests. Meta Pixel `903377856077201` records `PageView` through the shared document shell, with a noscript image fallback. The existing Sona777 APK URL is centralized in `src/lib/data.ts` and used only by the download page; changing the landing page does not change the app itself. WhatsApp support shows an unavailable message until a contact is configured.

This variant is saved locally for review and has not been deployed. The setup commands below target a separate Pages project.

## Local verification

```sh
bun install --frozen-lockfile
npm test
npx tsc --noEmit
npm run build
npm run preview:pages
```

Open `http://localhost:4174`. Deploy the complete `dist` directory, including `_worker.js`, because the site uses TanStack Start server rendering.

## Separate deployment target

This branch targets the separate Cloudflare Pages project `sona777-compact`, hosted at https://sona777-compact.pages.dev. Before the first deployment, create a Direct Upload project with production branch `variant/sona-compact`:

```sh
npx wrangler login
npx wrangler pages project create sona777-compact --production-branch variant/sona-compact
```

The GitHub Actions workflow runs for this branch and uses repository variable `CLOUDFLARE_ACCOUNT_ID` and secret `CLOUDFLARE_API_TOKEN`. The token needs Cloudflare Pages edit access to the target project. Existing Sona777 and Raja567 deployment targets are unchanged on their branches.

For a manual deployment after setup:

```sh
npm run deploy:pages
```

No deployment or remote project creation is performed by local verification. Retained conversion callback infrastructure is documented in [CONVERSION_TRACKING.md](./CONVERSION_TRACKING.md); CTA references are recorded before navigation and reused for APK attempts. Supabase tracking is optional; provide `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` repository variables to enable it. The download page offers the installation reference for explicit transfer to the app.

## Verify after deployment

- Open `/` and `/download`, then switch between English and Hindi.
- Refresh the page and confirm the selected language persists after hydration.
- Confirm `/charts`, `/blog` and retired article URLs return 404.
- Check CTA placement tracking and the APK target on `/download`.
- Check metadata and outbound links for the informational content.
