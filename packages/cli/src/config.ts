import { existsSync } from "fs-extra";
import { getPackageJSON } from "./paths";
import { writeFileSync } from "fs";
import { error } from "./log";

export const MAILING_CONFIG_FILE = "./mailing.config.json";

export const DEFAULTS = {
  typescript: looksLikeTypescriptProject(),
  emailsDir: "./emails",
  outDir: "./previews_html",
  port: 3883,
};

function looksLikeTypescriptProject(): boolean {
  if (existsSync("./tsconfig.json")) {
    return true;
  }

  const pkg = getPackageJSON();
  return !!(pkg.devDependencies?.typescript || pkg.dependencies?.typescript);
}

// write the default mailing.config.json file to get you started
export function writeDefaultConfigFile(): void {
  const prettier = require("prettier");

  if (!existsSync(MAILING_CONFIG_FILE)) {
    const configJsonString = prettier.format(JSON.stringify(DEFAULTS), {
      parser: "json",
      printWidth: 0,
    });

    try {
      writeFileSync(MAILING_CONFIG_FILE, configJsonString);
    } catch (err) {
      error(err);
    }
  }
}
