import { existsSync } from "fs-extra";
import { getPackageJSON } from "./paths";
import { writeFileSync } from "fs";
import { error } from "./log";

export const MAILING_CONFIG_FILE = "./mailing.config.json";

// defaults for all options
export const DEFAULTS = {
  typescript: looksLikeTypescriptProject(),
  emailsDir: "./emails",
  outDir: "./previews_html",
  port: 3883,
  quiet: false,
};

// options to include in the default config file
const DEFAULT_KEYS_FOR_CONFIG_FILE = ["typescript", "emailsDir", "outDir"];

// an object to JSON stringify and write to the default config file
const DEFAULTS_FOR_CONFIG_FILE = Object.fromEntries(
  DEFAULT_KEYS_FOR_CONFIG_FILE.map((key) => [
    key,
    DEFAULTS[key as keyof typeof DEFAULTS],
  ])
);

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
    const configJsonString = prettier.format(
      JSON.stringify(DEFAULTS_FOR_CONFIG_FILE),
      {
        parser: "json",
        printWidth: 0,
      }
    );

    try {
      writeFileSync(MAILING_CONFIG_FILE, configJsonString);
    } catch (err) {
      error(err);
    }
  }
}
