# Cloudflare Pages deployment

Production site: https://sona777-landing.pages.dev. The Pages project is `sona777-landing`, with `main` as its production branch.

The app uses TanStack Start server rendering and Nitro's `cloudflare-pages` preset. Deploy the complete `dist` directory, including `_worker.js`. The worker handles live result requests and conversion callbacks; static hosting alone will not run those features.

## Automatic GitHub deployment

Repository: https://github.com/quantumdigitalhub/sona777-landing-page.

[The deployment workflow](./.github/workflows/deploy-pages.yml) runs on pushes to `main` and can be started manually from the repository's Actions tab. It installs from `bun.lock`, runs tests and TypeScript checks, builds `dist`, and uploads it to the existing `sona777-landing` Pages project. Production deployments run one at a time.

The project was created using Direct Upload. Cloudflare cannot switch it to its built-in Git integration; GitHub Actions deploys into the existing project and preserves `sona777-landing.pages.dev` and `app.sona777.app`.

Configure these values under repository Settings → Secrets and variables → Actions:

| Name                            | Type     | Purpose                                                           |
| ------------------------------- | -------- | ----------------------------------------------------------------- |
| `CLOUDFLARE_ACCOUNT_ID`         | Variable | Quantum Digital Hub's Cloudflare account                          |
| `VITE_SUPABASE_URL`             | Variable | Public Supabase URL embedded in the browser bundle                |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Variable | Public Supabase key used for CTA and download tracking            |
| `CLOUDFLARE_API_TOKEN`          | Secret   | API token with Account → Cloudflare Pages → Edit for that account |

The three repository variables are configured from the existing deployment settings. Create the Cloudflare API token at https://dash.cloudflare.com/profile/api-tokens and store it directly in [GitHub Actions secrets](https://github.com/quantumdigitalhub/sona777-landing-page/settings/secrets/actions). Wrangler's local OAuth login is not used by GitHub Actions. Once the secret is configured, push to `main` or select Actions → Deploy to Cloudflare Pages → Run workflow.

## Runtime configuration

These server values belong in Cloudflare Pages' production environment, rather than in the browser build or workflow:

| Variable                    | Purpose                                                 |
| --------------------------- | ------------------------------------------------------- |
| `SUPABASE_URL`              | Supabase URL available to server requests               |
| `SUPABASE_PUBLISHABLE_KEY`  | Public key available to server requests                 |
| `SUPABASE_SERVICE_ROLE_KEY` | Runtime secret for authenticated conversion storage     |
| `CONVERSION_WEBHOOK_SECRET` | Runtime HMAC secret shared with the trusted app backend |

The deployed project already has `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`. Conversion callbacks still need the service-role key and webhook secret. Store those as encrypted Cloudflare secrets; never prefix them with `VITE_` or commit them. Live results are fetched server-side from `RESULTS_BASE_URL` without credentials.

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

The deploy script builds first, then uploads to the Pages project configured in `wrangler.jsonc`. Run it only after configuring the project's environment variables and secrets. The script does not create or migrate the Supabase database.

## Verify after deployment

- Open `/` and confirm the logos, hero image, and all three result categories load.
- Refresh the results to check the deployed server function.
- Open a chart and confirm the address remains on the landing site's `/charts/...` route.
- Open `/download` and verify the Download App button targets the configured CDN file.
- Confirm unsigned conversion callbacks are rejected; validate signed callbacks with the app backend when its integration is ready.

References: [Nitro Cloudflare Pages preset](https://nitro.build/deploy/providers/cloudflare#cloudflare-pages), [Cloudflare continuous deployment guide](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/), and [Pages Wrangler configuration](https://developers.cloudflare.com/pages/functions/wrangler-configuration/).
