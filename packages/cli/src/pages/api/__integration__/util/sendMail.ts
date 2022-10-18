import { Api, cliUrl } from "./index";

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

    const defaultHeaders = {
      "Content-Type": "application/json",
    };

    const headers = apiKey
      ? { ...defaultHeaders, "X-API-Key": apiKey }
      : defaultHeaders;

    this.fetchData = {
      method: "POST",
      headers,
    };
  }

  formData = {
    subject: "hello",
    to: "peter+sendMailAPI@campsh.com",
    templateName: "AccountCreated",
    props: { name: "Peter" },
  };
}
