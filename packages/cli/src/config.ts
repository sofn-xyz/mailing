import { existsSync } from "fs-extra";
import { getPackageJSON } from "./paths";
import { writeFileSync } from "fs";
import { error } from "./log";

export const MAILING_CONFIG_FILE = "./mailing.config.json";

export function looksLikeTypescriptProject(): boolean {
  if (existsSync("./tsconfig.json")) {
    return true;
  }

  const pkg = getPackageJSON();
  return !!(pkg.devDependencies?.typescript || pkg.dependencies?.typescript);
}

export function writeDefaultConfigFile(): void {
  const fs = require("fs");
  const prettier = require("prettier");

  if (!existsSync(MAILING_CONFIG_FILE)) {
    const configJsonString = prettier.format(
      JSON.stringify({
        typescript: looksLikeTypescriptProject(),
        emailsDir: "./emails",
      }),
      { parser: "json", printWidth: 0 }
    );

    try {
      writeFileSync(MAILING_CONFIG_FILE, configJsonString);
    } catch (err) {
      error(err);
    }
  }
}
