import nodemailer from "nodemailer";
import { buildSendMail } from "mailing-core";

const transport = nodemailer.createTransport({
  pool: true,
  host: "email-smtp.us-east-1.amazonaws.com",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: process.env.SES_USER,
    pass: process.env.SES_PASSWORD,
  },
});

const sendMail = buildSendMail({
  transport,
  defaultFrom: "alex.farrill@gmail.com",
  configPath: "./mailing.config.json",
});

export default sendMail;
