# Deploy

### _[Demo](http://demo.mailing.run/previews/AccountCreated/accountCreated)_

### Why deploy?

- Share previews with clients and your team
- Email service with [REST API](https://github.com/sofn-xyz/mailing#rest-api)
  - /api/render renders templates
  - /api/sendMail sends email using your sendMail from emails/index.ts
- [Coming soon] Unsubcribe Portal
- [Coming soon] Analytics

### Vercel

The easiest way to deploy your preview server is via Vercel's UI. Under the hood, mailing is a Next.js application and Vercel is great at hosting these. Configuring your deployment this way will also give you easy previews on PRs and automatic deployments from your main branch.

1. Create a new project on [vercel.com](https://vercel.com/)
2. Connect it to your git repository
3. Configure the build command to run `npx mailing server build`
4. Configure the output directory to be `.mailing/.next`

Here’s a working Vercel configuration:

<img width="793" alt="Screen Shot 2022-09-26 at 11 57 06 AM" src="https://user-images.githubusercontent.com/282016/192357879-a19ec556-00c3-49b6-883c-6ae55e8eff7f.png">

#### CLI

Alternatively, `npx mailing deploy` deploys your server to Vercel via their interactive CLI. After deploying, be sure to link Vercel to your repo for automatic deployments on [vercel.com](https://vercel.com/dashboard)

### Other hosts

If you want to deploy somewhere else, you can use `npx mailing server build` to build the production app and `npx mailing server start` to boot it on localhost.
