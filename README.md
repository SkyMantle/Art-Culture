# Art & Culture

This project uses **Next.js** for server-side rendering (SSR).

The codebase is tested with **Node.js 18.x**. If you use `nvm`, run `nvm use` in
the project directory to ensure the correct version.

## Getting Started

This project requires Node 18 or later. Install dependencies and create a local `.env` file based on `.env.example`:

```bash
npm install
```

If you see peer dependency errors, try:

```bash
npm install --legacy-peer-deps
```

Tests rely on an up-to-date `package-lock.json`.


## Environment Variables

Copy `.env.example` to `.env` and update the values as needed.

- `DATABASE_URL` – connection string for PostgreSQL
- `REDIS_URL` or `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN`
- `SHOPIFY_API_KEY` and `SHOPIFY_API_SECRET`
- `NEXTAUTH_SECRET` and provider credentials like `GITHUB_ID`/`GITHUB_SECRET`
- `NEXT_PUBLIC_HOST` – hostname used when rendering on the server
- `API_BASE_URL` - base URL for server-side API requests
- `TOKEN` - access token for internal APIs

## NextAuth

Ensure the environment variables above are set. Start the development server and open `/api/auth/signin` to test authentication.

## Development

Run the development server:

```bash
npm run dev
```

## Production

Build and start the production server:

```bash
npm run build
npm start
```

## Deployment

See [docs/GCP_DEPLOY.md](docs/GCP_DEPLOY.md) for instructions on building a Docker image and deploying to Google Cloud Run.



## Testing

Run `npm install` before executing tests to install dev dependencies such as Jest.

Run all tests once:

```bash
npm test
```

To continually run tests as files change, use watch mode:

```bash
npm run test:watch
```

## SEO

SEO metadata is defined in [`src/meta/index.js`](src/meta/index.js).

## Middleware and SSR

The middleware in [`middleware.ts`](middleware.ts) now detects the locale from the
URL. Requests without a locale prefix are redirected to `/uk` by default and an
`X-Art-Culture` header is added to all responses.

A demo SSR page is available at [`src/pages/ssr.js`](src/pages/ssr.js) which uses `getServerSideProps` to select a random news item on each request.

## Static Regeneration

News pages are pre-rendered at build time but regenerate periodically. The
`revalidate` export in [`src/app/news/[id]/page.tsx`](src/app/news/%5Bid%5D/page.tsx)
instructs Next.js to refresh the static content every 60 seconds.

For information on obtaining sample SQL dumps see [docs/SAMPLE_DATA.md](docs/SAMPLE_DATA.md).

## License

This project is licensed under the [MIT License](LICENSE).
