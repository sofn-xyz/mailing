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
  if (isTypescript) {
    await copy(resolve(srcDir, "emails"), emailsDir, {
      overwrite: false,
    });
  } else {
    await copy(resolve(srcDir, "emails-js"), emailsDir, {
      overwrite: false,
    });
  }

  const fileTree = tree(emailsDir, {
    exclude: [/node_modules|\.mailing|yarn\.lock|yalc\.lock/],
  });
  log(`generated your emails dir at ${emailsDir}:\n${fileTree}`);
}
