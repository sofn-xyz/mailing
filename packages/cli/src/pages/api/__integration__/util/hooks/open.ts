import { Api } from "../index";

interface HookOpenFormData {
  messageId?: string;
}

export async function apiHookOpen({ messageId }: { messageId?: string } = {}) {
  const instance = new ApiHookOpen({ messageId: messageId });
  return instance.perform();
}

export class ApiHookOpen extends Api<HookOpenFormData> {
  path = "/api/hooks/open";

  fetchData = { method: "GET" };
  constructor({ messageId }: { messageId?: string } = {}) {
    super();
    this.formData = {
      messageId,
    };
  }
}
