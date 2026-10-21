# Cloudflare Pages deployment

This branch (`variant/non-gambling`) contains the Raja567 app download variant. The original Raja567 site remains on `raja-567`. The Sona777 app download variant is preserved on `variant/sona-non-gambling`.

This variant includes an app download landing page and `/download` with English/Hindi APK installation guidance. Charts and article URLs return 404. The homepage displays the supplied Raja567 app screenshot. There are no live result-provider requests. Meta Pixel `1543631320841240` loads in the shared document shell and records `PageView`, with a noscript image fallback. The existing Raja567 APK URL is centralized in `src/lib/data.ts` and used only by the download page; changing the landing page does not change the app itself. WhatsApp installation support uses the existing Raja567 contact, centralized in `WHATSAPP_SUPPORT_URL`.

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

This branch targets the separate Cloudflare Pages project `raja567-download`, hosted at https://raja567-download.pages.dev. Before the first deployment, create a Direct Upload project with production branch `variant/non-gambling`:

```sh
npx wrangler login
npx wrangler pages project create raja567-download --production-branch variant/non-gambling
```

The GitHub Actions workflow runs for this branch and uses repository variable `CLOUDFLARE_ACCOUNT_ID` and secret `CLOUDFLARE_API_TOKEN`. The token needs Cloudflare Pages edit access to the target project. Existing Sona777 and Raja567 deployment targets are unchanged on their branches.

For a manual deployment after setup:

```sh
npm run deploy:pages
```

No deployment or remote project creation is performed by local verification. Retained conversion callback infrastructure is documented in [CONVERSION_TRACKING.md](./CONVERSION_TRACKING.md); CTA references are recorded before navigation and reused for APK attempts. Supabase tracking is optional; provide `RAJA567_VITE_SUPABASE_URL` and `RAJA567_VITE_SUPABASE_PUBLISHABLE_KEY` repository variables to enable it. The download page offers the installation reference for explicit transfer to the app.

## Verify after deployment

- Open `/` and `/download`, then switch between English and Hindi.
- Refresh the page and confirm the selected language persists after hydration.
- Confirm `/charts`, `/blog` and retired article URLs return 404.
- Check CTA placement tracking and the APK target on `/download`.
- Check metadata and outbound links for the informational content.
