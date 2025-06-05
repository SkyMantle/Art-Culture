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

## SEO

SEO metadata is defined in [`src/meta/index.js`](src/meta/index.js).

## Middleware and SSR

A simple middleware is defined in [`middleware.ts`](middleware.ts). It adds an `X-Art-Culture` header to all responses.

A demo SSR page is available at [`src/pages/ssr.js`](src/pages/ssr.js) which uses `getServerSideProps` to select a random news item on each request.
