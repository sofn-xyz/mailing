import { cliUrl, fetch } from "./index";

export async function apiSendMail(apiKey: string) {
  return await fetch(cliUrl("/api/sendMail"), {
    method: "POST",
    body: JSON.stringify({
      subject: "hello",
      to: "peter+sendMailAPI@campsh.com",
      templateName: "AccountCreated",
      props: { name: "Peter" },
    }),
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
    },
  });
}
