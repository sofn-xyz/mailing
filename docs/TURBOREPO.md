# Turborepo + Mailing

Turborepo is a popular monorepo management tool. Mailing works great with Turborepo but there are a few ways to set it up depending on your needs.

### Option 1: different email templates per app

This is the simpler setup and is best if you're just using Mailing to send emails from a single app or if each one of your apps has its own templates. You can still share template *components* across apps via a shared package but each app will have it's own emails directory with templates and previews.

To set this up, go to your app’s directory and install `mailing` and `mailing-core` then setup with `npx mailing init` as usual. Full setup instructions in the [Readme](https://github.com/sofn-xyz/mailing#setup) should just work in your app's directory.

An example with this setup can be found here: https://github.com/sofn-xyz/mailing-turborepo-example/tree/email-per-app

### Option 2: package with shared emails across apps

This is a more complicated setup intended for cases where you have different apps that should all be able to send the same emails.

1. Add a package called packages/mailing. You'll want to install `mailing`, `mailing-core`, `next`, `react`, and `react-dom` in here.
2. 
