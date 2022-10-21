import { Api } from "./index";

interface CreateMessageFormData {
  to: string | string[];
  bcc?: string | string[];
  cc?: string | string[];
  from: string;
  subject: string;
  html: string;
  templateName?: string;
  previewName?: string;
}

export async function apiCreateMessage() {
  const instance = new ApiCreateMessage();
  return instance.perform();
}

export class ApiCreateMessage extends Api<CreateMessageFormData> {
  path = "/api/messages";

  formData = {
    to: `ok${Math.random()}@ok.com`,
    from: "from@mailing.dev",
    subject: "subject",
    html: "<body>html</body>",
  };
}
