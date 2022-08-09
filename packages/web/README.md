# Web

## Getting Started

Run the development server:

```bash
yarn dev
```

### DB

Web attaches to [planetscale via prisma](https://planetscale.com/docs/tutorials/prisma-quickstart). To develop locally, you open a connection to a shared cloud development DB:

```bash
pscale connect mailing develop --port 3309
```
