import nodemailer from "nodemailer";
import { buildSendMail } from "mailing-core";
import config from "./mailing.config.json";

const transport = nodemailer.createTransport({
  pool: true,
  host: "smtp.example.com",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: "username",
    pass: "password",
  },
});

const sendMail = buildSendMail({
  transport,
  defaultFrom: "replace@me.with.your.com",
  config,
});

export default sendMail;
