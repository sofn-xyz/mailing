# Gigaben [working title]

A simple framework for authoring and sending great emails from your react app.

- ✅ Email templates with React components
- ✅ Battle-tested components that work across clients (Outlook!)
- ✅ Mail previews for quick development
- ✅ Test-mode for ensuring emails send and have the correct content
- ✅ Uses the venerable nodemailer
- ✅ Inspired by the venerable rails ActionMailer
- ✅ Plays well with js frameworks like redwood.js, remix, next.js
- ✅ Written in Typescript

## Setup

1. Install reaction-mailer in your package.json with yarn or npm.

2. Scaffold your `emails` directory with `yarn reaction-mailer init` or `npm run reaction-mailer init`.

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

3. Configure your email transport in `emails/index.ts`. It defaults to nodemailer's SMTP transport, but you can read about others [here](https://nodemailer.com/transports/).

```tsx
import nodemailer from "nodemailer";
import { ReactionMailer } from "reaction-mailer";

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

export default new ReactionMailer({ transport });
```

4. Then send you first email like so:

```tsx
import { sendMail, MyFirstEmail } from "emails";

sendMail(<MyFirstEmail firstName="Bob" />);
```

## Adding to a next.js app

TODO

## Developing with email previews

TODO

## Testing emails with jest

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

## Contributing

### Setup

1. Ensure you have nodejs 12+ setup.

2. Run these to install the project

```zsh
git clone git@github.com:psugihara/gigaben.git
cd gigaben
npm install
npm build # compiles the project to /lib
npm link # symlinks the node module
gigaben # this command is defined as bin in package.json
```

At this point you should also be able to link import.

`src` has the source code
`lib` is the build directory, no need to manually edit

### TODOs

requirements

- [x] setup package with lib and cli
- [ ] generate emails directory (working on this rn)
- [ ] email.ts API
- [ ] basic tests for lib
- [ ] basic tests for cli (see commander readme for testing cli)
- [ ] email previews
- [ ] format README, logo
- [ ] rename (react-mailer, gigaben, mailing, omail, mailbus, must be available on npmjs.com)
- [ ] instructions for next.js integration
- [ ] publish to npm

---

below the line

- [ ] instructions for redwood.js integration
- [ ] instructions for remix.run integration
- [ ] faktory integration
