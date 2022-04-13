# Mailing [working title]

#### Send great emails from your react app.

- ✅ Email templates with React components
- ✅ Battle-tested components that work across clients (Outlook!)
- ✅ Mail previews for quick development
- ✅ Test-mode for ensuring emails send and have the correct content
- ✅ Inspired by ActionMailer
- ✅ Plays well with js frameworks like redwood.js, remix, next.js
- ✅ Written in Typescript

# TODO: VIDEO HERE

## Why?

I love a good email. Usage metrics imply that a lot of people do. Bad emails suck.

But every web developer I've ever met hates making them.

Let's make coding them fun.

## Setup

1. Install mailing in your package.json with yarn or npm.

`npm install mailing` or `yarn add mailing`

2. Scaffold your `emails` directory with `gigaben init`.

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
import { Mailing } from "gigaben";

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

Want to help make this? Cool!

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

- `src` has the source code
- `lib` is the build directory, no need to manually edit

### Plan

I want to put out 

requirements

- [x] setup package with lib and cli
- [x] generate emails directory
- [ ] email.ts API
- [ ] basic tests for lib
- [~] basic tests for cli (see commander readme for testing cli)
- [~] email previews (working on this next)
- [ ] format README, logo
- [ ] rename (react-mailer, gigaben, mailing, omail, mailbus, must be available on npmjs.com)
- [ ] instructions for next.js integration
- [ ] publish to npm
- [ ] add video to readme

---

below the line

- [ ] instructions for redwood.js integration
- [ ] instructions for remix.run integration
- [ ] faktory integration
