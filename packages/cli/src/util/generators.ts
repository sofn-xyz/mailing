import { copy } from "fs-extra";
import { resolve } from "path";
import tree from "tree-node-cli";
import { log } from "./log";

export async function generateEmailsDirectory({
  isTypescript,
  emailsDir,
}: {
  isTypescript: boolean;
  emailsDir: string;
}) {
  // copy the emails dir template in!
  const path = `generator_templates/${isTypescript ? "ts" : "js"}/emails`;
  console.log(process.env.MM_ENV)
  const srcDir =
    process.env.MM_ENV === "test" || process.env.MM_ENV === "development"
      ? __dirname + "/.."
      : __dirname + "/../src";
  await copy(resolve(srcDir, path), emailsDir, {
    overwrite: false,
  });
  log(
    `generated your emails dir at ${emailsDir}:\n${tree(emailsDir, {
      exclude: [/node_modules|\.mailing|yarn\.lock|yalc\.lock/],
    })}`
  );
}
