import { existsSync } from "fs-extra";
import { readPackageJSON } from "./paths";
import { writeFileSync } from "fs";
import { log, error } from "./log";
import * as prettier from "prettier";

export const MAILING_CONFIG_FILE = "./mailing.config.json";

// defaults for all options
export const DEFAULTS = {
  typescript: looksLikeTypescriptProject(),
  emailsDir: existsSync("./src/emails") ? "./src/emails" : "./emails",
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

  const pkg = readPackageJSON();
  return !!(pkg.devDependencies?.typescript || pkg.dependencies?.typescript);
}

// write the default mailing.config.json file to get you started
export function writeDefaultConfigFile(): void {
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

    log(
      `Added mailing.config.json to your project with the following contents:
${configJsonString}`
    );
  }
}

/* Preview server config singleton */

interface PreviewServerConfig {
  emailsDir: string;
}

let previewServerConfig: PreviewServerConfig | undefined;

export function setConfig(newConfig: PreviewServerConfig) {
  previewServerConfig = newConfig;
}

export function getConfig(): PreviewServerConfig {
  if (undefined === previewServerConfig) {
    throw new Error("previewServerConfig is undefined");
  }
  return previewServerConfig;
}
