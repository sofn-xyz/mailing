## Deploying the preview server

The mailing preview server has a super power: it’s easy to deploy a fast production version when you want to share templates with your team or clients. You can also hit the REST API on your deployed mailing server to generate HTML from your templates.

### Vercel

#### UI

The easiest way to deploy your preview server is via Vercel. Under the hood, mailing is a Next.js application and Vercel is great at hosting these. Configuring your deployment this way will also give you easy previews on PRs and automatic deployments from your main branch.

Create a new project on vercel.com
Connectr it to your git repository
Configure the build command to run `mailing server build`
Configure the output directory to be `.mailing/.next`

Here’s a working Vercel configuration:

<img width="500" alt="Screen Shot 2022-09-26 at 11 20 30 AM" src="https://user-images.githubusercontent.com/282016/192351405-146d0c25-32f7-4d68-b7dd-3f830e8e1892.png">


#### CLI

Alternatively, `mailing deploy` deploys your server to Vercel via their interactive CLI.

### Other hosts

If you want to deploy somewhere else, you can use `mailing server build` to build the production next app and `mailing server start` to boot it on localhost. The first command runs `next build .mailing` and the second command runs `next start .mailing`. 
