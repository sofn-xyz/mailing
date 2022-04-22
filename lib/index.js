"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
// import open from "open";
// import { file } from "tmp-promise";
// import fs from "fs";
// import { render } from "mjml-react";
// export { default as Preview } from "./components/Preview";
__exportStar(require("./loaders/previewIndexLoader"), exports);
// In test, we write the email queue to this file so that it can be read
// by the test process.
const TMP_TEST_FILE = "tmp-testMessageQueue.json";
// export async function getTestMessageQueue() {
//   if (!process.env.TEST || process.env.NODE_ENV === "test") {
//     throw new Error("tried to get test message queue not in test mode");
//   }
//   try {
//     const queue = await fs.readFileSync(TMP_TEST_FILE);
//     return JSON.parse(queue.toString());
//   } catch (e) {
//     return [];
//   }
// }
// export default function buildSendMail(options: mailing.SendMailOptions) {
//   const forcePreview =
//     options.forcePreview ||
//     (process.env.NODE_ENV === "development" && !options.forceDeliver);
//   const testMode = process.env.TEST || process.env.NODE_ENV === "test";
//   return async function sendMail(mail: mailing.ComponentMail) {
//     const renderedComponent = render(mail.component);
//     // Create a mail for nodemailer with the component rendered to HTML.
//     const htmlMail = Object.assign(mail, {
//       html: renderedComponent.html,
//       component: undefined,
//     });
//     if (testMode) {
//       const testMessageQueue = await getTestMessageQueue();
//       testMessageQueue.push(htmlMail);
//       fs.writeFileSync(TMP_TEST_FILE, JSON.stringify(testMessageQueue));
//       return;
//     }
//     if (forcePreview) {
//       const { path } = await file();
//       console.log("writing to path", path);
//       fs.writeFileSync(path, renderedComponent.html);
//       open(path);
//       return;
//     }
//     await options.transport.sendMail(htmlMail);
//   };
// }
