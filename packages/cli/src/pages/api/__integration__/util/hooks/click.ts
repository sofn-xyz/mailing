import { Api } from "../index";

interface HookClickFormData {
  url: string;
  messageId?: string;
}

export async function apiHookClick({ messageId }: { messageId?: string } = {}) {
  const instance = new ApiHookClick({ messageId });
  return instance.perform();
}

export class ApiHookClick extends Api<HookClickFormData> {
  path = "/api/hooks/click";

  fetchData = { method: "GET" };
  constructor({ messageId }: { messageId?: string } = {}) {
    super();
    this.formData = {
      url: Buffer.from("http://localhost:3883").toString("base64"),
      messageId,
    };
  }
}
