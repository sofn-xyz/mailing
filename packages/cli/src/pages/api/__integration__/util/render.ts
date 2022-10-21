import { Api, cliUrl } from "./index";

interface RenderFormData {
  templateName: string;
  props: any;
}

export function apiRender() {
  const instance = new ApiRender();
  return instance.perform();
}

export class ApiRender extends Api<RenderFormData> {
  path = cliUrl("/api/render");
  method = "POST";

  formData = {
    templateName: "AccountCreated",
    props: { name: "Alex" },
  };
}
export class ApiRenderGet extends Api<RenderFormData> {
  path = cliUrl("/api/render");
  method = "GET";

  formData = {
    templateName: "AccountCreated",
    props: "%7B%22name%22%3A%22Alex%22%7D",
  };
}
