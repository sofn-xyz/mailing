# Web

## Getting Started

Run the development server:

```bash
yarn dev
```

### DB

For DB features, web attaches to [planetscale via prisma](https://planetscale.com/docs/tutorials/prisma-quickstart). To develop locally, first add the DATABASE_URL to `packages/web/.env`:

```bash
DATABASE_URL="mysql://root@127.0.0.1:3309/mailing"
```

Then use the pscale CLI to open a connection to a shared cloud development DB:

```bash
pscale connect mailing develop --port 3309
```

If it's your first time using pscale, you'll need to log in.
