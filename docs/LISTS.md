# Mailing Lists

// N.B. In the future this will be a paid feature with a generous free tier.

Mailing Lists make sure your users only get the emails they want. With Lists, you can include a link for users to update their email preferences in your templates by adding a magic link to your mailing template. Mailing will keep track of what their preferences are and show them the option to unsubscribe or resubscribe to any list that they’ve ever been sent from before.

We hope you and your users will enjoy using Lists!

## Usage with sendMail
Once you have an API Key set in your environment (see below), you can email a list:

```jsx
const send = await sendMail({
  component: <SystemNotification data={d} />,
  subject: “Re: Issue #432”,
  to: "alex <alex@g.com>",
  cc: “bot”,
  list: "notifications" // << each list has a unique name
})
```

This sends an email to the `to` and `cc` recipients (`alex` and `peter`) but first it checks if `alex` is has unsubscribed from the “notifications” list. If `alex@g.com` has unsubscribed from the “notifications” list, it will return false without sending.

If the list doesn't exist, it will be created. There's no limit to the number of lists you can create.

The SystemNotification template contains a link to `alex`’s email preferences screen.

```jsx
UnsubscribeLink.jsx

import { LIST_SETTINGS_URL } from “mailing-core”;

…

<a href={LIST_SETTINGS_URL}>Unsubscribe</a>
```

`sendMail` will substitute `LIST_SETTINGS_URL` with a link to the recipient's email settings page. Users will only see lists they've been sent from before.

[IMAGE of email settings with 3 lists “Notifications”, “Marketing”, “”]

Live example: https://demo.mailing.run/unsubscribe/mock

## Concepts: lists and members
A list is an email newsletter with a name and a collection of members (email address and a subscription status).

### The default list
When you first create an account in your Mailing instance, it will automatically create a list called Default for you. This list acts as a global unsubscribe list: anyone who unsubscribes from this list won’t receive email sent to any of your other lists.

### Other lists
You can create additional lists just by sending to one with `sendMail`. Each should correspond to a particular topic, e.g. “Product updates” or “Transactional emails”. Users can subscribe or unsubscribe to these lists individually via the email preferences page. They won’t be sent any emails to other lists if they are unsubscribed from the Default list.

You can (and should) add a link to the subscriber’s email preferences page by adding a link in your template with the magic text `EMAIL_PREFERENCES_URL` from `mailing-core` as the href. Example:
`<a href={MM_EMAIL_PREFERENCES_URL}>Unsubscribe</a>`
When you go to send your emails using sendMail, Mailing will automatically inject the correct link for each subscriber into the email.

### List members
Subscribers to an individual list are stored in the Member table in the database. The subscriber’s status can be either “subscribed” or “unsubscribed.”

## Lists/Members REST API
**Lists**
- GET `/api/lists` - get all lists
- POST `/api/lists` - create a new list

**List members**
- GET `/api/lists/[id]/members` - get the members of a list
- POST `/api/lists/[id]/members` - add a member to a list

**List member**
- GET `/api/lists/[id]/members/[memberId]` - get a list member’s status
- PATCH `/api/lists/[id]/members/[memberId]` - update a list member’s status

## Setup: Making an API Key
1. Connect database To use Lists, you’ll need to have deployed mailing and connect it to a postgres database by setting `MAILING_DATABASE_URL` in your deploy environment. We’re happy to do this for you, email peter@campsh.com and we’ll set up a Neon database for you to connect to. Because the API is serverless, it’s important that you use a postgres service that can handle a high number of connections. We reccomend [neon.tech](https://neon.tech).
2. Create an account Navigate to /signup on your production instance of Mailing and set up a new account. This secures your deployment and will automatically create your Default list and an API key to use /api/sendMail as well.  (Note: at the moment, we only allow one user to sign up per instance).  If you need to login again in the future, visit /login.
3. Set env variables in the environment you're using `sendMail` from:
   - After logging in, you are taken to the /settings page.  Make note of the API key that was created and set this as `MAILING_API_KEY`
   - Set the url of your deployed mailing instance as `MAILING_API_URL`