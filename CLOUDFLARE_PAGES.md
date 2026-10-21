# Cloudflare Pages deployment

This branch (`variant/non-gambling`) contains the Raja567 informational variant. The original Raja567 site remains on `raja-567`; the Sona777 site remains on `main`.

The informational variant includes the homepage and English/Hindi digital guides. Legacy chart, download and article URLs return 404. It has no result-provider requests, APK links, WhatsApp destination or Meta Pixel.

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

This branch targets the separate Cloudflare Pages project `raja567-guides`. Before the first deployment, create a Direct Upload project with production branch `variant/non-gambling`:

```sh
npx wrangler login
npx wrangler pages project create raja567-guides --production-branch variant/non-gambling
```

The GitHub Actions workflow runs for this branch and uses repository variable `CLOUDFLARE_ACCOUNT_ID` and secret `CLOUDFLARE_API_TOKEN`. The token needs Cloudflare Pages edit access to the target project. Existing brand deployment targets are unchanged on their branches.

For a manual deployment after setup:

```sh
npm run deploy:pages
```

No deployment or remote project creation is performed by local verification. Retained conversion callback infrastructure is documented in [CONVERSION_TRACKING.md](./CONVERSION_TRACKING.md); the informational pages do not emit download or app conversion events.

## Verify after deployment

- Open `/`, `/blog` and each guide, then switch between English and Hindi.
- Refresh a guide and confirm the selected language persists after hydration.
- Confirm `/charts`, `/download` and retired article URLs return 404.
- Check metadata and outbound links for the informational content.
