type Intercept = {
  html: string;
  to?: string | string[];
  from?: string;
  subject?: string;
  cc?: string | string[];
  bcc?: string | string[];
};

type SendPreviewRequestBody = {
  to: string;
  html?: string;
  previewFunction?: string;
  previewClass?: string;
  subject: string;
};

type SendPreviewResponseBody = {
  error?: string;
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
