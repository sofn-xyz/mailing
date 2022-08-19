type Intercept = {
  html: string;
  to?: string | string[];
  from?: string;
  subject?: string;
  cc?: string | string[];
  bcc?: string | string[];
};

type ShowPreviewResponseBody = {
  errors: MjmlError[];
  html: string;
};

type MjmlError = {
  line: number;
  message: string;
  tagName: string;
  formattedMessage: string;
};

type ViewMode = "desktop" | "mobile" | "html";
