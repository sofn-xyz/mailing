type Intercept = {
  id: string;
  html: string;
  to?: string | string[];
  from?: string | { name: string; address: string };
  subject?: string;
  cc?: string | string[];
  bcc?: string | string[];
};

type SendPreviewRequestBody = {
  to: string;
  previewFunction: string;
  previewClass: string;
};

type SendPreviewResponseBody = {
  error?: string;
};

type ShowPreviewResponseBody = {
  errors: MjmlError[];
  htmlLint: HtmlLintError[];
  html: string;
};

type MjmlError = {
  line: number;
  message: string;
  tagName: string;
  formattedMessage: string;
};

type HtmlLintError = {
  message: string;
};

type ViewMode = "desktop" | "mobile" | "html";

type MailingConfig = {
  anonymousId?: string | null;
  emailsDir?: string;
  port?: number;
  quiet?: boolean;
};
