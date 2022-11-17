import { Api } from "./index";

interface SendMailFormData {
  subject: string;
  to: string;
  templateName: string;
  props: {
    name: string;
  };
}

export async function apiSendMail(apiKey: string | undefined, formData?: any) {
  const instance = new ApiSendMail(apiKey);
  if (formData) instance.formData = formData;
  return await instance.perform();
}

export class ApiSendMail extends Api<SendMailFormData> {
  static defaultFormData: SendMailFormData = {
    subject: "hello",
    to: "alex.farrill@gmail.com",
    templateName: "AccountCreated",
    props: { name: "Peter" },
  };

  path = "/api/sendMail";

  constructor(apiKey?: string) {
    super();
    this.fetchData = JSON.parse(JSON.stringify(Api.defaultFetchData));
    if (apiKey) this.fetchData.headers["X-API-Key"] = apiKey;
  }

  formData = { ...ApiSendMail.defaultFormData };
}
