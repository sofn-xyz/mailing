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

[TODO: add little video of dev mode working]

```
> mailing init


```

<br/>

## ●&nbsp;&nbsp;Why?

We’re longtime users of Action Mailer and wanted something similar for our typescript/react apps. We didn’t find anything, so we decided to build Mailing. We added some features that we would’ve liked in Action Mailer, like a mobile toggle (with hotkeys), and the ability to send a test email from the browser while developing. We went all in on MJML so that we never have to think about email clients or nested tables :)

<br/>

## ●&nbsp;&nbsp;Setup

1. Install mailing-core and the development server with yarn or npm:

yarn:

```
yarn add mailing-core mjml mjml-react nodemailer &&\
yarn add --dev mailing @types/mjml @types/mjml-react
```

npm:

```
npm install --save mailing-core mjml mjml-react nodemailer &&\
npm install --save-dev mailing @types/mjml @types/mjml-react
```

2. Scaffold your `email` directory with `mailing init`. This will create the following directory for all of your emails:

```
emails
├── index.ts // this exports sendMail and is where your SMTP config goes
├── MyFirstEmail.tsx // an example email
├── components // shared components go in here
│   └── Header.tsx
└── previews // use previews to develop and examine your templates with different props
    └── MyFirstEmail.tsx
```

3. Configure your email transport and `defaultFrom` in `email/index.ts`. It defaults to nodemailer's SMTP transport, but you can read about others [here](https://nodemailer.com/transports/).

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

<img width="600" alt="Mailing index" src="https://user-images.githubusercontent.com/609038/178890200-2ba96ca5-c2d5-462e-b7a8-14981eb4e2c3.jpg">

Clicking through shows you the email with a mobile/desktop toggle and live reload as you edit:

<img width="600" alt="Mailing desktop preview" src="https://user-images.githubusercontent.com/609038/178886460-8ccb31c3-1f33-47b3-b5b8-721cdd32dcc9.jpg">

When it's nice, send it to yourself or a [Litmus]([url](https://www.litmus.com)) account for final testing:

<img width="600" alt="Mailing mobile preview" src="https://user-images.githubusercontent.com/609038/178887244-15eb960d-79a1-42f0-ac32-face27211d7b.jpg">



<br/>

## ●&nbsp;&nbsp;Testing emails with jest

```tsx
import { getTestMailQueue } from "emails";

describe("Example API", () => {
  it("sends an email when an issue is ready for review", () => {
    // DO SOMETHING THAT SHOULD SEND AN EMAIL

    const emails = await getTestMailQueue();
    expect(emails.length).toBe(1);
    expect(emails[0].subject).toMatch("Re: An issue title");
    expect(emails[0].html).toMatch("READY FOR REVIEW");
    expect(emails[0].html).toMatch("ready for QA");
  });
});
```

<br/>

## ●&nbsp;&nbsp;&nbsp;Contributing

### Setup

```zsh
git clone git@github.com:psugihara/mailing.git
cd mailing
yarn
yarn dev
```

- `packages/cli` has the development dependency
- `packages/core` has the prod dependency

The CLI gets installed in `node_modules/.bin` as `mailing` and `mm` for short.

`mm` alias for `mailing init`

`mailing init` initializes a project then starts the development server

`mailing preview` launches the development server

### Plan

show hn requirements

- [x] setup package with lib and cli
- [x] generate emails directory
- [x] email.ts API
- [x] basic tests for lib
- [x] basic tests for cli (init test)
- [x] email previews
- [ ] polished README
- [x] logo
- [x] rename (react-mailer, gigaben, mailing, omail, mailbus, must be available on npmjs.com)
- [x] publish to npm
- [ ] add video to readme
- [ ] pull into a next.js project and it works (and test that)
- [x] split into 2 packages so that preview server is not included
- [x] write show hn post

---

just below the line

- [ ] instructions for redwood.js integration
- [ ] instructions for remix.run integration
- [ ] faktory integration
- [ ] mailing.run website

