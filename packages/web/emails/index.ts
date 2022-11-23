import nodemailer from "nodemailer";
import { buildSendMail } from "mailing-core";

const transport = nodemailer.createTransport({
  host: "email-smtp.us-east-1.amazonaws.com",
  pool: true,
  secure: true,
  port: 587,
  auth: {
    user: process.env.MAILING_SES_USER,
    pass: process.env.MAILING_SES_PASSWORD,
  },
});

const sendMail = buildSendMail({
  transport,
  defaultFrom: "Mailing Team <team@mailing.run>",
  configPath: "./mailing.config.json",
});

export default sendMail;
