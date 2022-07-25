<img src="https://user-images.githubusercontent.com/609038/163605455-478b8883-235c-4803-9b48-fc2d9a912b73.png#gh-dark-mode-only" alt="Mailling logo" width="295" height="128"/>
<img src="https://user-images.githubusercontent.com/609038/163605459-12c1d04b-9891-4c73-9ed0-fbccddfaa476.png#gh-light-mode-only" alt="Mailling logo" width="295" height="128"/>

<a href="https://www.npmjs.com/package/mailing"><img src="https://img.shields.io/npm/v/mailing.svg?sanitize=true" alt="Version"></a>
[![Featured on Openbase](https://badges.openbase.com/js/featured/mailing.svg?token=A6xfdFmUU161m5Jns1Aqf4SwwIMSQBipWCm7HCdl1wc=)](https://openbase.com/js/mailing?utm_source=embedded&utm_medium=badge&utm_campaign=rate-badge)

<h2>●&nbsp;&nbsp;Build, test, send emails with TypeScript and React</h2>

- Email templates with React components
- MJML components that work across clients (Outlook!)
- Preview server with live reload for quick development
- Dev mode opens emails in your browser instead of sending
- Test mode for ensuring emails send and have the correct content
- Plays well with js frameworks like redwood.js, remix, next.js
- Written in TypeScript, inspired by Action Mailer from Ruby on Rails
- TypeScript only (for now)

<br/>

## ●&nbsp;&nbsp;Why?

We’re longtime users of Action Mailer and wanted something similar for our typescript/react apps. We didn’t find anything, so we decided to build Mailing. We added some features that we would’ve liked in Action Mailer, like a mobile toggle (with hotkeys), and the ability to send a test email from the browser while developing. We went all in on MJML so that we (almost) never have to think about email clients or nested tables :)

<br/>

## ●&nbsp;&nbsp;Demo

<a href="https://www.youtube.com/watch?v=FUCoXg2sAg0" target="_blank"><img width="600" alt="Mailing demo video" src="https://user-images.githubusercontent.com/609038/180310097-dac98b4d-126b-4dfa-91e0-41628d8c083e.jpg"></a>

<br/>

## ●&nbsp;&nbsp;Setup

1. Install mailing-core and the development server with yarn or npm:

yarn:

```
yarn add mailing-core mjml mjml-react nodemailer &&\
yarn add --dev mailing @types/mjml @types/mjml-react @types/nodemailer
```

npm:

```
npm install --save mailing-core mjml mjml-react nodemailer &&\
npm install --save-dev mailing @types/mjml @types/mjml-react @types/nodemailer
```

2. Run `npx mailing` to start the preview server and scaffold your `emails` directory. This will create the following directory for all of your emails:

```
emails
├── TextEmail.tsx // a simple example email template
├── Welcome.tsx // a complicated example email template
├── components // shared components go in here
│   ├── BulletedList.tsx
│   ├── Footer.tsx
│   ├── Head.tsx
│   ├── Header.tsx
│   └── theme.ts
├── index.ts // this exports sendMail and is where your SMTP config goes
└── previews // use previews to develop and check templates
    ├── TextEmail.tsx
    └── Welcome.tsx
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
import Welcome from "emails/Welcome";

sendMail({
  subject: "My First Email",
  to: "tester@example.com",
  cc: "tester+cc@example.com",
  bcc: ["tester+bcc@example.com", "tester+bcc2@example.com"],
  component: <Welcome firstName="Amelita" />,
});
```

<br/>

## ●&nbsp;&nbsp;Developing with email previews

Mailing includes a development mode for working on your emails. Running `mailing` in dev will boot the preview server on localhost:3883 and show you all previews in `emails/previews`. The previews live reload when files in the emails directory change. Previews are just functions that return one of your emails loaded up with props. We recommend grouping all previews for the same email template in a file at `emails/previews/TemplateName.tsx`.

For example, here's `emails/previews/Welcome.tsx`:

```tsx
import React from "react";
import Welcome from "../Welcome";

export function toAmelita() {
  return <Welcome name="Amelita" />;
}
```

It will show up in the index:

<img width="600" alt="Mailing index" src="https://user-images.githubusercontent.com/609038/179312196-d95683f8-4451-4b94-8f7a-f8c96f2e2895.jpg">

Clicking through shows you the email with a mobile/desktop toggle and live reload as you edit:

<img width="600" alt="Mailing desktop preview" src="https://user-images.githubusercontent.com/609038/179312262-e8d746ff-b820-4109-bae1-7e49bb3f2cca.jpg">

When it's nice, send it to yourself or your QA tool of choice for final testing (we like [Litmus](<[url](https://www.litmus.com)>)):

<img width="600" alt="Mailing mobile preview" src="https://user-images.githubusercontent.com/609038/179312306-096e7787-4321-4c3e-9e72-6abb820d73f0.jpg">

<br/>

## ●&nbsp;&nbsp;Templates

We ship with two templates to help you get started. We recommend using these as starting points and modifying them to fit your use case.

**Welcome Template**

This template showcases a handful of MJML and Mailing features, including a responsive hero image, bulleted list, and custom Google font with fallbacks.

<img width="600" alt="Mailing Welcome email template" src="https://user-images.githubusercontent.com/609038/179326104-37a01d2a-9ea0-4cda-b6fe-4fc86ec2dfe9.jpg">

**Transactional Template**

This is a simpler template for text-based transactional emails.

<img width="600" alt="Mailing text email template" src="https://user-images.githubusercontent.com/609038/179326123-8f7a252b-2541-42b9-b14d-e62a2835ce9e.jpg">

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
    //   component: <IssueNotification />
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

`mailing` runs init then preview

`mm` is a cute alias for `mailing`

[source entrypoint](https://github.com/successor-software/mailing/blob/main/packages/cli/src/index.ts)

<br/>

## ●&nbsp;&nbsp;&nbsp;Contributing

Want to improve Mailing? Incredible. Try it out, file an issue or open a PR!

### Setup

```zsh
git clone git@github.com:successor-software/mailing.git
cd mailing
yarn
yarn dev
```

`yarn dev` starts the cli in dev mode

### Setup with a demo next app

For development, you may want to have a demo next app that pulls in your changes. We've had success using yalc[https://github.com/wclr/yalc] and the following flow:

- Register `mailing` as a local package with `yalc`: in the `packages/cli` directory, run `yalc add`.
- Create a new next app in your projects directory by running `yarn create next-app --typescript` for a typescript app OR `yarn create next-app` for a js app
- In the next app, run `yalc add mailing`, this creates `node_modules/mailing` and `node_modules/.bin/mailing`. (Note: `yarn link` does not add the bin file, which is why `yalc` is prefered)
- Make your changes in `mailing`
- Run `yarn build` in the `mailing` root directory to create new `dist` files
- Run `yalc push` in the `mailing` root directory to both publish your changes to yalc (`yalc publish`) and pull them in to your next app (`yalc update`)

### Roadmap

- [ ] JS support (only TS works at the moment)
- [ ] easily deploy previews to web for design QA/demo purposes (e.g. `mailing build` -> static site)
- [ ] generator for new email template
