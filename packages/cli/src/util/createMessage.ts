import prisma from "../../prisma";
import Analytics from "./analytics";

type CreateMessageArgs = {
  to: string | string[];
  bcc?: string | string[];
  cc?: string | string[];
  from: string;
  subject: string;
  html: string;
  templateName?: string;
  previewName?: string;
};

/*
 * Create a message and messageContent in the database
 */
const createMessage = async ({
  to,
  bcc,
  cc,
  from,
  subject,
  html,
  templateName,
  previewName,
}: CreateMessageArgs) => {
  const message = await prisma.message.create({
    data: {
      to: to,
      bcc: bcc,
      cc: cc,
      from: from,
      subject: subject,
      templateName: templateName,
      previewName: previewName,
    },
  });

  // Send analytics event to 3rd party analytics if desired
  Analytics.track({
    event: "email.sent",
    properties: {
      recipientCount: Array(to).length + Array(cc).length + Array(bcc).length,
    },
  });

  await prisma.messageContent.create({
    data: {
      html: html,
      messageId: message.id,
    },
  });

  return message;
};

export default createMessage;