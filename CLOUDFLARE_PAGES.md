# Cloudflare Pages deployment

This branch (`variant/megha777-download`) contains the Megha 777 app download site. Sona777 and Raja567 remain on their existing branches and Cloudflare projects.

The homepage uses original SVG logos and a violet theme. `/download` provides English/Hindi installation guidance and the supplied Android download URL. All download calls to action route through `/download`. Meta Pixel `1090370266939482` records `PageView` through the shared document shell, including a noscript image fallback. No WhatsApp contact has been supplied; support controls show an explicit unavailable state. No live result feed or app screenshot is presented.

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

This branch targets the separate Cloudflare Pages project `megha777-download`, hosted at https://megha777-download.pages.dev. Before the first deployment, create a Direct Upload project with production branch `variant/megha777-download`:

```sh
npx wrangler login
npx wrangler pages project create megha777-download --production-branch variant/megha777-download
```

The GitHub Actions workflow runs for this branch and uses repository variable `CLOUDFLARE_ACCOUNT_ID` and secret `CLOUDFLARE_API_TOKEN`. The token needs Cloudflare Pages edit access to the target project. Existing Sona777 and Raja567 deployment targets are unchanged on their branches.

For a manual deployment after setup:

```sh
npm run deploy:pages
```

No deployment or remote project creation is performed by local verification. Retained conversion callback infrastructure is documented in [CONVERSION_TRACKING.md](./CONVERSION_TRACKING.md); CTA references are recorded before navigation and reused for APK attempts. Supabase tracking is optional; provide `MEGHA777_VITE_SUPABASE_URL` and `MEGHA777_VITE_SUPABASE_PUBLISHABLE_KEY` repository variables to enable it. The download page offers the installation reference for explicit transfer to the app.

## Verify after deployment

- Open `/` and `/download`, then switch between English and Hindi.
- Refresh the page and confirm the selected language persists after hydration.
- Confirm `/charts`, `/blog` and retired article URLs return 404.
- Check CTA placement tracking and the APK target on `/download`.
- Check metadata and outbound links for the informational content.
