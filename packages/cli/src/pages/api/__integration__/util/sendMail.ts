import { Api, cliUrl, ApiHeaders } from "./index";

interface SendMailFormData {
  subject: string;
  to: string;
  templateName: string;
  props: {
    name: string;
  };
}

export async function apiSendMail(apiKey?: string) {
  const instance = new ApiSendMail(apiKey);
  return await instance.perform();
}

class ApiSendMail extends Api<SendMailFormData> {
  path = cliUrl("/api/sendMail");

  constructor(apiKey?: string) {
    super();

    this.fetchData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (apiKey) this.fetchData.headers["X-API-Key"] = apiKey;
  }

  formData = {
    subject: "hello",
    to: "peter+sendMailAPI@campsh.com",
    templateName: "AccountCreated",
    props: { name: "Peter" },
  };
}
