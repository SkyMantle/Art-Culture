# Art & Culture

This project uses **Next.js** for server-side rendering (SSR).

## Getting Started

Install dependencies and create a local `.env` file based on `.env.sample`:

```bash
npm install
```

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


## Testing

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
