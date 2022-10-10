<img src="https://user-images.githubusercontent.com/609038/163605455-478b8883-235c-4803-9b48-fc2d9a912b73.png#gh-dark-mode-only" alt="Mailing logo" width="295" height="128"/>
<img src="https://user-images.githubusercontent.com/609038/163605459-12c1d04b-9891-4c73-9ed0-fbccddfaa476.png#gh-light-mode-only" alt="Mailing logo" width="295" height="128"/>

<a href="https://www.npmjs.com/package/mailing"><img src="https://img.shields.io/npm/v/mailing.svg?sanitize=true" alt="Version"></a>
[![Featured on Openbase](https://badges.openbase.com/js/featured/mailing.svg?token=A6xfdFmUU161m5Jns1Aqf4SwwIMSQBipWCm7HCdl1wc=)](https://openbase.com/js/mailing?utm_source=embedded&utm_medium=badge&utm_campaign=rate-badge)
[![](https://dcbadge.vercel.app/api/server/fdSzmY46wY?style=flat)](https://discord.gg/fdSzmY46wY)

<h2>●&nbsp;&nbsp;Build, test, send emails with React</h2>

- Email templates with React components
- MJML components that work across clients (Outlook!)
- Preview server with live reload for quick development
- Dev mode opens emails in your browser instead of sending
- Test mode for ensuring emails send and have the correct content
- Plays well with js frameworks like next.js, redwood.js, remix
- Written in TypeScript, inspired by Action Mailer from Ruby on Rails

<br/>

## ●&nbsp;&nbsp;Why?

We’re longtime users of Action Mailer and wanted something similar for our typescript/react apps. We didn’t find anything, so we decided to build Mailing. We added some features that we would’ve liked in Action Mailer, like a mobile toggle (with hotkeys), and the ability to send a test email from the browser while developing. We went all in on MJML so that we (almost) never have to think about email clients or nested tables :)

<br/>

## ●&nbsp;&nbsp;Demo

<a href="https://www.youtube.com/watch?v=FUCoXg2sAg0" target="_blank"><img width="600" alt="Mailing demo video" src="https://user-images.githubusercontent.com/609038/183299543-fbe8b7de-daab-4a79-8644-1d4b3af1bf63.jpg"></a>

<br/>

## ●&nbsp;&nbsp;Setup

1. Install mailing with yarn or npm:

yarn:

```
yarn add mailing mailing-core next
```

npm:

```
npm install --save mailing mailing-core next
```

Note: you may want to add mailing as a dev dependency instead if you don't plan to use the preview function outside of development. mailing-core exports buildSendMail, which returns the sendMail function

Note: mailing requires version 17 or 18 of react and react-dom, so if you're not already in a react-based app, you'll need to add the following:

yarn:

```
yarn add react react-dom
```

npm:

```
npm install --save react react-dom
```

2. Run `npx mailing` to start the preview server and scaffold your `emails` directory. This will create the following directory for all of your emails:

```
emails
├── AccountCreated.tsx
├── NewSignIn.tsx
├── Reservation.tsx
├── ResetPassword.tsx
├── components // shared components go in here
│   ├── BulletedList.tsx
│   ├── ButtonPrimary.tsx
│   ├── Footer.tsx
│   ├── Head.tsx
│   ├── Header.tsx
│   └── theme.ts
├── index.ts // this exports sendMail and is where your SMTP config goes
└── previews // use previews to develop and check templates
    ├── AccountCreated.tsx
    ├── NewSignIn.tsx
    ├── Reservation.tsx
    └── ResetPassword.tsx
```

3. <a id="configure-transport"></a>Configure your email transport and `defaultFrom` in `emails/index.ts`. It defaults to nodemailer's SMTP transport, but you can read about others [here](https://nodemailer.com/transports/).

Example SendGrid transport:

```tsx
const transport = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey",
    pass: process.env.SEND_GRID_KEY,
  },
});
```

4. Finally, send your first email like so:

```tsx
import { sendMail } from "emails";
import AccountCreated from "emails/AccountCreated";

sendMail({
  subject: "My First Email",
  to: "tester@example.com",
  cc: "tester+cc@example.com",
  bcc: ["tester+bcc@example.com", "tester+bcc2@example.com"],
  component: <AccountCreated firstName="Amelita" />,
});
```

<br/>

## ●&nbsp;&nbsp;Developing with email previews

Mailing includes a development mode for working on your emails. Running `mailing` in dev will boot the preview server on localhost:3883 and show you all previews in `emails/previews`. The previews live reload when files in the emails directory change. Previews are just functions that return one of your emails loaded up with props. We recommend grouping all previews for the same email template in a file at `emails/previews/TemplateName.tsx`.

For example, here's `emails/previews/AccountCreated.tsx`:

```tsx
import AccountCreated from "../AccountCreated";

export function accountCreated() {
  return <AccountCreated name="Amelita" />;
}
```

On the left, you'll see a list of all of your emails. On the right, you'll see an individual email preview with a mobile/desktop/HTML toggle and live reload as you edit:

<img width="600" alt="Mailing desktop preview" src="https://user-images.githubusercontent.com/609038/188324943-729009f0-c6f2-45a5-87b7-ae6338d7c45f.jpg">

When your email is nice, send it to yourself or your QA tool of choice for final testing (we like [Litmus](<[url](https://www.litmus.com)>)):

<img width="600" alt="Mailing mobile preview" src="https://user-images.githubusercontent.com/609038/188352419-8e1be23a-fa64-4e61-9e36-ecac8d882959.jpg">

<br/>

## ●&nbsp;&nbsp;Templates

We ship with a few templates to help you get started. These get added to your emails directory upon initialization with `mailing init`. We recommend using these as starting points and modifying them to fit your use case. Check them out [here](https://demo.mailing.run).

<br/>

## ●&nbsp;&nbsp;Testing emails with jest

When `NODE_ENV === "test"`, calling `sendMail` pushes messages into a queue for later examination. The `mail-core` package exports a couple of functions for testing that emails send with the correct content.

`function getTestMailQueue(): Promise<Mail[]>`

Retrieve the test message queue.

`function clearTestMailQueue(): Promise<void>`

Clear the test message queue. You probably want to call this before tests that use the queue.

Example:

```tsx
import { sendMail } from "emails";
import { getTestMailQueue, clearTestMailQueue } from "mailing/core";
import IssueNotification from "emails/IssueNotification";

describe("Example API", () => {
  it("sends an email when an issue is ready for review", () => {
    await clearTestEmailQueue();

    // SOMETHING THAT WILL SEND AN EMAIL e.g.
    // sendMail({
    //   to: "someone@something.com",
    //   subject: "test",
    //   component: <TextEmail ... />,
    // });

    const emails = await getTestMailQueue();
    expect(emails.length).toBe(1);
    expect(emails[0].subject).toMatch("Re: An issue title");
    expect(emails[0].html).toMatch("READY FOR REVIEW");
    expect(emails[0].html).toMatch("ready for QA");
  });
});
```

<br/>

## ●&nbsp;&nbsp;&nbsp;CLI

`mailing init` initializes a project then starts the development server

`mailing preview` launches the development server

`mailing server build` builds the next app in .mailing

`mailing server start` starts the next app built in .mailing/.next

`mailing server` builds and starts it

`mailing export-previews` exports template previews as plain html files

`mailing` runs init then preview

`mm` is a cute alias for `mailing`

[source entrypoint](https://github.com/sofn-xyz/mailing/blob/main/packages/cli/src/index.ts)

### mailing.config.js

Running `mailing init` generates a mailing.config.js file that will be used as default options for the CLI commands. The default options are:

```
  {
    "typescript": ???, // ("true" if you have a tsconfig.json in your root, otherwise "false")
    "emailsDir": "./emails",
    "outDir": "./previews_html" // (directory for export-previews html output)
  }
```

Append --help to your CLI command for a full list of supported options. Any of these options can be added to your config file.

<br/>

## ●&nbsp;&nbsp;&nbsp;REST API

With the REST API, you can use mailing for email templating even if most of your app is not written in TypeScript or JavaScript.

`GET /api/render` takes a template name and props and returns your rendered HTML ready to be sent. [Example](https://demo.mailing.run/api/render?templateName=AccountCreated&props=%7B%22name%22%3A%22peter%22%7D)

`GET /api/previews` returns the list of previews. [Example](https://demo.mailing.run/api/previews)

`GET /api/previews/[previewClass]/[previewFunction]` returns the rendered preview and data for `/previews/[previewClass]/[previewFunction]`. [Example](https://demo.mailing.run/api/previews)

<br/>

## ●&nbsp;&nbsp;&nbsp;Deployment

The mailing preview server has a super power: it’s easy to deploy a fast production version when you want to share templates with your team or clients. You can also hit the REST API on your deployed mailing server to generate HTML from your templates.

Learn more and get started [here](https://github.com/sofn-xyz/mailing/blob/main/docs/DEPLOY.md).

## ●&nbsp;&nbsp;&nbsp;Telemetry

To help understand how people are using mailing so that we can prioritize efforts, mailing collects some anonymized telemetry about usage.

<br/>

## ●&nbsp;&nbsp;&nbsp;Contributing

Want to improve Mailing? Incredible. Try it out, file an issue or open a PR!

Check the [CONTRIBUTING.md](https://github.com/sofn-xyz/mailing/blob/main/docs/CONTRIBUTING.md) for more info.
