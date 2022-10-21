import type { NextApiRequest, NextApiResponse } from "next";
import { validateApiKey } from "src/util/validateApiKey";
import createMessage from "../../../util/createMessage";

type Data = {
  error?: string;
  message?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!(await validateApiKey(req, res))) return;

  const message = createMessage({
    to: req.body.to,
    bcc: req.body.bcc,
    cc: req.body.cc,
    from: req.body.from,
    subject: req.body.subject,
    html: req.body.html,
    templateName: req.body.templateName,
    previewName: req.body.previewName,
  });

  return res.status(200).json({ message });
}
