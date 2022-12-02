import { execSync } from "child_process";
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
  const srcEmailsDir = resolve(srcDir, "emails");

  if (isTypescript) {
    // copy the emails dir template in!
    await copy(srcEmailsDir, emailsDir, {
      overwrite: false,
    });
  } else {
    log("Generating Javascript files from Typescript Files...");
    execSync(`
    npx tsc \
    --allowSyntheticDefaultImports true \
    --moduleResolution node \
    --jsx preserve \
    --target es2020 \
    --outDir ${emailsDir} \
    --noEmit false \
    ${`${srcEmailsDir}/**/*.tsx`} \
    ${`${srcEmailsDir}/*.ts`}
    `);
    log("Prettifying Javascript files...");
    execSync(`npx prettier --write ${emailsDir}`);
    execSync(`npx eslint --fix --ext .jsx,.js ${emailsDir}`);
  }

  const fileTree = tree(emailsDir, {
    exclude: [/node_modules|\.mailing|yarn\.lock|yalc\.lock/],
  });
  log(`generated your emails dir at ${emailsDir}:\n${fileTree}`);
}
