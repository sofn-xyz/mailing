## Deploying the preview server

The mailing preview server has a super power: it’s easy to deploy a fast production version when you want to share templates with your team or clients. You can also hit [the REST API](https://github.com/sofn-xyz/mailing#rest-api) on your deployed mailing server to generate HTML from your templates.

### Vercel

#### UI

The easiest way to deploy your preview server is via Vercel. Under the hood, mailing is a Next.js application and Vercel is great at hosting these. Configuring your deployment this way will also give you easy previews on PRs and automatic deployments from your main branch.

1. Create a new project on [vercel.com](https://vercel.com/)
2. Connect it to your git repository
3. Configure the build command to run `mailing server build`
4. Configure the output directory to be `.mailing/.next`

Here’s a working Vercel configuration:

<img width="793" alt="Screen Shot 2022-09-26 at 11 57 06 AM" src="https://user-images.githubusercontent.com/282016/192357879-a19ec556-00c3-49b6-883c-6ae55e8eff7f.png">


#### CLI

Alternatively, `mailing deploy` deploys your server to Vercel via their interactive CLI.

### Other hosts

If you want to deploy somewhere else, you can use `mailing server build` to build the production next app and `mailing server start` to boot it on localhost. The first command runs `next build .mailing` and the second command runs `next start .mailing`. 
