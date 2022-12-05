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

  // copy the emails dir template in!
  const srcEmails = isTypescript ? "emails" : "emails-js";
  await copy(resolve(srcDir, srcEmails), emailsDir, { overwrite: false });

  const fileTree = tree(emailsDir, {
    exclude: [/node_modules|\.mailing|yarn\.lock|yalc\.lock/],
  });
  log(`generated your emails dir at ${emailsDir}:\n${fileTree}`);
}
