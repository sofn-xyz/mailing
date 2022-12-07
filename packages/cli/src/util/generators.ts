import { copy } from "fs-extra";
import { resolve } from "path";
import tree from "tree-node-cli";
import { log } from "./serverLogger";

export async function generateEmailsDirectory({
  emailsDir,
  isTypescript,
}: {
  emailsDir: string;
  isTypescript: boolean;
}) {
  const srcDir =
    process.env.MM_DEV || process.env.NODE_ENV === "test"
      ? __dirname + "/.."
      : __dirname + "/../src";
  let templateDir = srcDir;

  if (process.env.MAILING_INTEGRATION_TEST || process.env.NODE_ENV === "test") {
    templateDir += "/__mocks__";
  }
  // copy the emails dir template in!
  const srcEmails = isTypescript ? "emails" : "emails-js";
  await copy(resolve(templateDir, srcEmails), emailsDir, { overwrite: false });

  const fileTree = tree(emailsDir, {
    exclude: [/node_modules|\.mailing|yarn\.lock|yalc\.lock/],
  });
  log(`generated your emails dir at ${emailsDir}:\n${fileTree}`);
}
