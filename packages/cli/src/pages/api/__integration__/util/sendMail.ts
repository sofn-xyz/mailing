import { Api, cliUrl } from "./index";

interface SendMailFormData {
  subject: string;
  to: string;
  templateName: string;
  props: {
    name: string;
  };
}

export async function apiSendMail(apiKey: string) {
  const instance = new ApiSendMail();
  instance.fetchData.headers["X-API-Key"] = apiKey;
  return await instance.perform();
}

class ApiSendMail extends Api<SendMailFormData> {
  path = cliUrl("/api/sendMail");

  fetchData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    } as any,
  };

  formData = {
    subject: "hello",
    to: "peter+sendMailAPI@campsh.com",
    templateName: "AccountCreated",
    props: { name: "Peter" },
  };
}
