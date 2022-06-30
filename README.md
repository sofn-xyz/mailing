<a href="https://www.npmjs.com/package/mailing"><img src="https://img.shields.io/npm/v/mailing.svg?sanitize=true" alt="Version"></a>

<img src="https://user-images.githubusercontent.com/609038/163605455-478b8883-235c-4803-9b48-fc2d9a912b73.png#gh-dark-mode-only" alt="Mailling logo" width="295" height="128"/>
<img src="https://user-images.githubusercontent.com/609038/163605459-12c1d04b-9891-4c73-9ed0-fbccddfaa476.png#gh-light-mode-only" alt="Mailling logo" width="295" height="128"/>

<h2>●&nbsp;&nbsp;&nbsp;Send great emails from your react app.</h2>

- Email templates with React components
- MJML components that work across clients (Outlook!)
- Preview server for quick development
- Test-mode for ensuring emails send and have the correct content
- Plays well with js frameworks like redwood.js, remix, next.js
- Written in Typescript

<br/>

[TODO: add little video of dev mode working]

```
> mailing init




```

<br/>

## ●&nbsp;&nbsp;&nbsp;Why?

We love good emails. Usage metrics imply that a lot of people do. But every web developer hates making them. So, we want to make coding them easy.

<br/>

## ●&nbsp;&nbsp;&nbsp;Setup

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

2. Scaffold your `email` directory with `mailing init`.

This will create the following directory structure:

```
emails
├── MyFirstEmail.tsx
├── components
│   ├── Body.tsx
│   └── Header.tsx
├── index.ts
└── previews
    └── MyFirstEmail.tsx
```

4. Configure your email transport in `email/index.ts`. It defaults to nodemailer's SMTP transport, but you can read about others [here](https://nodemailer.com/transports/).

```tsx
import nodemailer from "nodemailer";
import { Mailing } from "mailing";

const transport = nodemailer.createTransport({
  pool: true,
  host: "smtp.example.com",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: "username",
    pass: "password",
  },
});

export default new Mailing({ transport });
```

5. Then send you first email like so:

```tsx
import { sendMail } from "emails";
import MyFirstEmail from "emails/MyFirstEmail";

sendMail(<MyFirstEmail firstName="Bob" />);
```

<br/>

## ●&nbsp;&nbsp;&nbsp;Adding to a next.js app

TODO

<br/>

## Developing with email previews

Mailing includes a development mode for previewing your emails. Running `mailing` in dev will boot the preview app and examine previews for different cases. Previews live reload when files in the emails directory change. [Needs e2e tests]

[ADD SCREENSHOT OF PREVIEW INDEX]

<br/>

## ●&nbsp;&nbsp;&nbsp;Testing emails with jest

```tsx
import { getTestMessageQueue } from "emails";

describe("Example API", () => {
  it("sends an email when an issue is ready for review", () => {
    // DO SOMETHING THAT SHOULD SEND AN EMAIL

    const emails = await getTestMessageQueue();
    expect(emails.length).toBe(1);
    expect(emails[0].subject).toMatch("Re: An issue title");
    expect(emails[0].html).toMatch("READY FOR REVIEW");
    expect(emails[0].html).toMatch("ready for QA");
  });
});
```

<br/>

## ●&nbsp;&nbsp;&nbsp;Contributing

Want to help make this? Cool!

### Setup

Run these to install the project, clone the nextjs app for development, and start servers.

```zsh
git clone git@github.com:psugihara/mailing.git
cd mailing
yarn
yarn init:dev # clone next dev app, install mailing, start mailing and next
```

- `packages/cli` has the development dependency
- `packages/core` has the prod dependency

### Plan

show hn requirements

- [x] setup package with lib and cli
- [x] generate emails directory
- [~] email.ts API
- [ ] basic tests for lib
- [~] basic tests for cli (init test)
- [~] email previews (working on this next)
- [ ] polished README
- [x] logo
- [x] rename (react-mailer, gigaben, mailing, omail, mailbus, must be available on npmjs.com)
- [ ] instructions for next.js integration
- [ ] publish to npm
- [ ] add video to readme
- [ ] pull into a project and it works (and test that)
- [x] split into 2 packages so that preview server is not included

---

just below the line

- [ ] instructions for redwood.js integration
- [ ] instructions for remix.run integration
- [ ] faktory integration
- [ ] mailing.run website

#### API

_`sendMail(mail: ComponentMail)`_

Send

```ts
type Mail
namespace mailing {
  export type ComponentMail = {
    from: string;
    to: string | string[];
    cc?: string | string[];
    bcc?: string | string[];
    subject: string;
    component: ReactElement<any, string | JSXElementConstructor<any>>;
    text?: string;
    headers?: { [key: string]: string };
  };
  export type SendMailOptions = {
    transport: Transporter;
    defaulFrom?: string;
    forceDeliver?: boolean;
    forcePreview?: boolean;
  };
}
```

The CLI gets installed in `node_modules/.bin` as `mailing` and `mm` for short.

`mm` alias for `mailing init`
`mailing init` initializes a project then starts the development server
`mailing preview` launches the development server
