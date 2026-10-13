# Cloudflare Pages deployment

Production site: https://sona777-landing.pages.dev. The Pages project is `sona777-landing`, with `main` as its production branch.

The app uses TanStack Start server rendering and Nitro's `cloudflare-pages` preset. Deploy the complete `dist` directory, including `_worker.js`. The worker handles live result requests and conversion callbacks; static hosting alone will not run those features.

## Git deployment

Connect the repository to a Cloudflare **Pages** project with these settings:

| Setting                   | Value                                            |
| ------------------------- | ------------------------------------------------ |
| Framework preset          | None                                             |
| Build command             | `bun install --frozen-lockfile && npm run build` |
| Build output directory    | `dist`                                           |
| Root directory            | Repository root                                  |
| `NODE_VERSION`            | `22.23.2`                                        |
| `BUN_VERSION`             | `1.4.3`                                          |
| `SKIP_DEPENDENCY_INSTALL` | `true`                                           |

The build command installs dependencies from `bun.lock`. `wrangler.jsonc` sets the project name, output directory, compatibility date, and `nodejs_compat`. If the Pages project uses a different name, update `name` in that file before deploying with Wrangler.

Set the following environment variables for both Production and Preview before the first build:

| Variable                        | Purpose                                                 |
| ------------------------------- | ------------------------------------------------------- |
| `VITE_SUPABASE_URL`             | Public Supabase URL embedded in the browser bundle      |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public Supabase key used for CTA and download tracking  |
| `SUPABASE_URL`                  | Supabase URL available to server requests               |
| `SUPABASE_PUBLISHABLE_KEY`      | Public key available to server requests                 |
| `SUPABASE_SERVICE_ROLE_KEY`     | Runtime secret for authenticated conversion storage     |
| `CONVERSION_WEBHOOK_SECRET`     | Runtime HMAC secret shared with the trusted app backend |

Use the existing Supabase project's values. Mark the service-role key and webhook secret as encrypted secrets; never prefix them with `VITE_` or put them in source control. The service-role key and webhook secret are required for conversion callbacks. Live results are fetched server-side from `RESULTS_BASE_URL` without credentials.

Apply the existing tracking database migrations and policies if they have not already been applied. Configure the app backend's conversion callback URL to `https://<your-site-domain>/api/public/conversions` after publishing; see [CONVERSION_TRACKING.md](./CONVERSION_TRACKING.md) for the callback contract.

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

References: [Nitro Cloudflare Pages preset](https://nitro.build/deploy/providers/cloudflare#cloudflare-pages), [Cloudflare Pages build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/), and [Pages Wrangler configuration](https://developers.cloudflare.com/pages/functions/wrangler-configuration/).
