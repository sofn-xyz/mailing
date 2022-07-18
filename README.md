<a href="https://www.npmjs.com/package/mailing"><img src="https://img.shields.io/npm/v/mailing.svg?sanitize=true" alt="Version"></a>

<img src="https://user-images.githubusercontent.com/609038/163605455-478b8883-235c-4803-9b48-fc2d9a912b73.png#gh-dark-mode-only" alt="Mailling logo" width="295" height="128"/>
<img src="https://user-images.githubusercontent.com/609038/163605459-12c1d04b-9891-4c73-9ed0-fbccddfaa476.png#gh-light-mode-only" alt="Mailling logo" width="295" height="128"/>

<h2>●&nbsp;&nbsp;Send great emails from your react app.</h2>

- Email templates with React components
- MJML components that work across clients (Outlook!)
- Preview server for quick development
- Dev mode opens emails in your browser instead of sending
- Test mode for ensuring emails send and have the correct content
- Plays well with js frameworks like redwood.js, remix, next.js
- Written in Typescript, inspired by Action Mailer from Ruby on Rails

<br/>

## ●&nbsp;&nbsp;Why?

We’re longtime users of Action Mailer and wanted something similar for our typescript/react apps. We didn’t find anything, so we decided to build Mailing. We added some features that we would’ve liked in Action Mailer, like a mobile toggle (with hotkeys), and the ability to send a test email from the browser while developing. We went all in on MJML so that we (almost) never have to think about email clients or nested tables :)

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

2. Scaffold your `emails` directory with `npx mailing`. This will create the following directory for all of your emails:

```
emails
├── TextEmail.tsx // a simple example email template
├── Welcome.tsx // a complicated example email template
├── components // shared components go in here
│   ├── BulletedList.tsx
│   ├── Footer.tsx
│   ├── Head.tsx
│   └── Header.tsx
├── index.ts // this exports sendMail and is where your SMTP config goes
└── previews // use previews to develop and check templates
    ├── TextEmail.tsx
    └── Welcome.tsx
```

This will also start the preview server on port 3883.

3. Configure your email transport and `defaultFrom` in `emails/index.ts`. It defaults to nodemailer's SMTP transport, but you can read about others [here](https://nodemailer.com/transports/).

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

4. Then send you first email like so:

```tsx
import { sendMail } from "emails";
import MyFirstEmail from "emails/MyFirstEmail";

sendMail(<MyFirstEmail firstName="Amelita" />);
```

<br/>

## ●&nbsp;&nbsp;Developing with email previews

Mailing includes a development mode for working on your emails. Running `mailing` in dev will boot the preview app on localhost and show you all previews in `emails/previews`. The previews live reload when files in the emails directory change. Previews are just functions that return one of your emails loaded up with props. We reccomend grouping all previews for the same email template in a file at `emails/previews/TemplateName.tsx`.

For example, here's `emails/previews/MyFirstEmail.tsx`:

```tsx
import React from "react";
import MyFirstEmail from "../MyFirstEmail";

export function toAmelita() {
  return <MyFirstEmail name="Amelita" />;
}
```

It will show up in the index:

<img width="600" alt="Mailing index" src="https://user-images.githubusercontent.com/609038/179312196-d95683f8-4451-4b94-8f7a-f8c96f2e2895.jpg">

Clicking through shows you the email with a mobile/desktop toggle and live reload as you edit:

<img width="600" alt="Mailing desktop preview" src="https://user-images.githubusercontent.com/609038/179312262-e8d746ff-b820-4109-bae1-7e49bb3f2cca.jpg">

When it's nice, send it to yourself or a [Litmus](<[url](https://www.litmus.com)>) account for final testing:

<img width="600" alt="Mailing mobile preview" src="https://user-images.githubusercontent.com/609038/179312306-096e7787-4321-4c3e-9e72-6abb820d73f0.jpg">

<br/>

## ●&nbsp;&nbsp;Templates

We ship with 2 templates to help you get started. We reccomend using these as starting points and modifying them to fit your use-case.

**Welcome Template**

This template is kind of a showcase of MJML and mailing features, including a responsive hero image, bulleted list, and custom google font with fallbacks.

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

[source entrypoint](https://github.com/psugihara/mailing/blob/main/packages/cli/src/index.ts)

<br/>

## ●&nbsp;&nbsp;&nbsp;Contributing

Want to improve Mailing? Incredible. Try it out, file an issue or open a PR!

### Setup

```zsh
git clone git@github.com:psugihara/mailing.git
cd mailing
yarn
yarn dev
```

`yarn dev` starts the cli in dev mode


### Plan

show hn requirements

- [x] setup package with lib and cli
- [x] generate emails directory
- [x] email.ts API
- [x] basic tests for lib
- [x] basic tests for cli (init test)
- [x] email previews
- [x] polished README
- [x] logo
- [x] rename (react-mailer, gigaben, mailing, omail, mailbus, must be available on npmjs.com)
- [x] publish to npm
- [ ] add video to readme
- [x] pull into a next.js project and it works
- [ ] pull into redwood.js project and it works
- [ ] pull into remix project and it works
- [ ] share with friends
- [x] split into 2 packages so that preview server is not included
- [x] write show hn post

---

just below the line

- [ ] automated tests of pulling into X project and it working
- [ ] faktory integration
- [ ] mailing.run website
- [ ] generator for new email template


### Roadmap

- [ ] JS support (only TS works at the moment)
- [ ] easily deploy previews to web for design QA/demo purposes (e.g. `mailing build` -> static site)
