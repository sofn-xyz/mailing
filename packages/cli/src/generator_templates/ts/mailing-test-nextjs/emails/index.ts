import nodemailer from "nodemailer";
import { buildSendMail } from "mailing-core";

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

const sendEmail = buildSendMail({ transport });

export default sendEmail;
