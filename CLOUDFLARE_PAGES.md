# Cloudflare Pages deployment

Each landing page uses its own branch and Cloudflare Pages project:

| Landing page | Git branch | Pages project | Production address |
| ------------ | ---------- | ------------- | ------------------ |
| Sona 777 | `main` | `sona777-landing` | https://sona777-landing.pages.dev |
| Raja 567 | `raja-567` | `raja567-landing` | Assigned by Cloudflare when the project is created |

This branch configures Raja 567. The existing deployment configuration on `main` continues to deploy Sona 777. Keep brand changes on their respective branches; merging Raja's deployment files into `main` would replace Sona's deployment target.

The app uses TanStack Start server rendering and Nitro's `cloudflare-pages` preset. Deploy the complete `dist` directory, including `_worker.js`. The worker handles live result requests and conversion callbacks; static hosting alone will not run those features.

## Automatic GitHub deployment

Repository: https://github.com/quantumdigitalhub/sona777-landing-page.

[The deployment workflow](./.github/workflows/deploy-pages.yml) on this branch runs on pushes to `raja-567` and can be started manually from the repository's Actions tab by selecting that branch. It installs from `bun.lock`, runs tests and TypeScript checks, builds `dist`, and uploads it to `raja567-landing` with production branch `raja-567`. Raja production deployments run one at a time, independently of Sona deployments.

Sona's project uses Direct Upload through GitHub Actions. Use the same deployment method for Raja; do not also enable Cloudflare Git builds for this project.

## One-time Raja 567 setup

Create a separate Direct Upload project in the same Cloudflare account. From this branch, authenticate and create it with the correct production branch:

```sh
npx wrangler login
npx wrangler pages project create raja567-landing --production-branch raja-567
```

If the project already exists, verify its production branch is `raja-567` before deploying; other branches produce preview deployments. Cloudflare assigns the project's `pages.dev` address during creation. Add Raja's custom domain to this project's Custom domains section when it is ready.

Configure these values under repository Settings → Secrets and variables → Actions:

| Name                            | Type     | Purpose                                                           |
| ------------------------------- | -------- | ----------------------------------------------------------------- |
| `CLOUDFLARE_ACCOUNT_ID`         | Variable | Quantum Digital Hub's Cloudflare account                          |
| `RAJA567_VITE_SUPABASE_URL`             | Variable | Raja's public Supabase URL embedded in the browser bundle                |
| `RAJA567_VITE_SUPABASE_PUBLISHABLE_KEY` | Variable | Raja's public Supabase key used for CTA and download tracking            |
| `CLOUDFLARE_API_TOKEN`          | Secret   | API token with Account → Cloudflare Pages → Edit for that account |

Reuse the existing account ID and API token if they cover this Cloudflare account. The two `RAJA567_` variables are optional while Raja's backend is pending. The workflow maps them to the app's `VITE_SUPABASE_*` build variables. Without both values, CTA references stay in browser session storage and no analytics requests are sent. Use a separate Supabase project for independent brand analytics when ready. Sona's repository variables remain unchanged.

If the token is missing, create one at https://dash.cloudflare.com/profile/api-tokens and store it directly in [GitHub Actions secrets](https://github.com/quantumdigitalhub/sona777-landing-page/settings/secrets/actions). Wrangler's local OAuth login is not used by GitHub Actions. Once the project, variables, and secrets are configured, push to `raja-567` or select Actions → Deploy Raja 567 to Cloudflare Pages → Run workflow → `raja-567`.

## Runtime configuration

These server values belong in Cloudflare Pages' production environment, rather than in the browser build or workflow:

| Variable                    | Purpose                                                 |
| --------------------------- | ------------------------------------------------------- |
| `SUPABASE_URL`              | Supabase URL available to server requests               |
| `SUPABASE_PUBLISHABLE_KEY`  | Public key available to server requests                 |
| `SUPABASE_SERVICE_ROLE_KEY` | Runtime secret for authenticated conversion storage     |
| `CONVERSION_WEBHOOK_SECRET` | Runtime HMAC secret shared with the trusted app backend |

Configure these values separately in the new `raja567-landing` project's production environment; Sona's runtime settings are not copied into a new Pages project. The server's Supabase URL and public key must match Raja's browser build values. Store the service-role key and webhook secret as encrypted Cloudflare secrets; never prefix them with `VITE_` or commit them. Live results are fetched server-side from `RESULTS_BASE_URL` without credentials.

Apply the existing tracking database migrations and policies if they have not already been applied. See [CONVERSION_TRACKING.md](./CONVERSION_TRACKING.md) for the callback contract.

## Local Cloudflare preview

```sh
bun install --frozen-lockfile
npm run build
npm run preview:pages
```

Open `http://localhost:4174`. For runtime secrets during local preview, use an ignored `.dev.vars` file with the server variable names above. Browser variables must be set in `.env` before building. Both files are ignored by Git.

## Manual deployment

```sh
npx wrangler login
npm run deploy:pages
```

The deploy script builds first, then explicitly uploads to `raja567-landing` with production branch `raja-567`. Run it only from this branch after configuring the project's environment variables and secrets. For local builds, set Raja's `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in the ignored `.env`; local environment files do not change when switching Git branches. The script does not create or migrate the Supabase database.

The page uses Raja567 branding. `APK_URL` in `src/lib/data.ts` is `https://cdn.kc777.bet/raja567.apk`; homepage download controls route through `/download` for installation guidance and attribution. `WHATSAPP_SUPPORT_URL` connects to +91 7410919134. Meta Pixel `1657616495733150` loads in the shared document shell and tracks `PageView`, with a noscript image fallback. Raja's result provider is `https://raja567matka.com/api/`, centralized in `RESULTS_BASE_URL`.

## Verify after deployment

- Open `/` and confirm the logos, hero image, and all three result categories load.
- Refresh the results to check the deployed server function.
- Open a chart and confirm the address remains on the landing site's `/charts/...` route.
- Open `/download` and verify the Download App button targets the configured CDN file.
- Confirm unsigned conversion callbacks are rejected; validate signed callbacks with the app backend when its integration is ready.

References: [Nitro Cloudflare Pages preset](https://nitro.build/deploy/providers/cloudflare#cloudflare-pages), [Cloudflare continuous deployment guide](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/), and [Pages Wrangler configuration](https://developers.cloudflare.com/pages/functions/wrangler-configuration/).
