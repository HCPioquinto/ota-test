This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# How it works

Technically, it has a mock data of 100 companies with ids 1 - 100

3 API routes for these are:
    GET api/company?page={number}&size={number} - Get's a splice of the Mock Data based on the Index and size
    DELETE api/company - params: {ids: number[]} - Delete's the ids on the cached Mock data
    PATCH  api/company - Resets the Cached Mock Data


Implemented Infinite Scroll,
Mock Error - Every 4 calls to the GET, it forces an Error to show error handling on api Failure
On click - Calls the previous api call again

On end - should show a Reached End
