import { existsSync, writeFileSync } from "fs-extra";
import { readPackageJSON } from "../paths";
import { log, logPlain } from "../serverLogger";
import { pick } from "lodash";
import * as prettier from "prettier";

export const MAILING_CONFIG_FILE = "./mailing.config.json";

type ConfigDefaults = {
  typescript: boolean;
  emailsDir: string;
  outDir: string;
  port: number;
  quiet: boolean;
  scaffoldOnly: boolean;
};

let DEFAULTS: ConfigDefaults | undefined;

// defaults for all options
export function defaults() {
  if (DEFAULTS === undefined)
    DEFAULTS = {
      typescript: looksLikeTypescriptProject(),
      emailsDir: existsSync("./src/emails") ? "./src/emails" : "./emails",
      outDir: "./previews_html",
      port: 3883,
      quiet: false,
      scaffoldOnly: false,
    };
  return DEFAULTS;
}

// options to include in the default config file
const DEFAULT_KEYS_FOR_CONFIG_FILE = ["typescript", "emailsDir", "outDir"];

// an object to JSON stringify and write to the default config file
function defaultsForConfigFile() {
  const defaultsToWriteToConfig = defaults();
  return pick(defaultsToWriteToConfig, DEFAULT_KEYS_FOR_CONFIG_FILE);
}

export function looksLikeTypescriptProject(): boolean {
  if (existsSync("./tsconfig.json")) {
    return true;
  }

  const pkg = readPackageJSON();
  return !!(pkg.devDependencies?.typescript || pkg.dependencies?.typescript);
}

// write the default mailing.config.json file to get you started
export function writeDefaultConfigFile(): void {
  if (existsSync(MAILING_CONFIG_FILE)) return;

  const configJsonString = prettier.format(
    JSON.stringify(defaultsForConfigFile()),
    {
      parser: "json",
      printWidth: 0,
    }
  );

  writeFileSync(MAILING_CONFIG_FILE, configJsonString);

  // ascii art moment
  logPlain(`
  ,,    ,,    ,,
  \`7MMM.     ,MMF'           db  \`7MM    db
    MMMb    dPMM                   MM
    M YM   ,M MM   ,6"Yb.  \`7MM    MM  \`7MM  \`7MMpMMMb.  .P"Ybmmm
    M  Mb  M' MM  8)   MM    MM    MM    MM    MM    MM :MI  I8
    M  YM.P'  MM   ,pm9MM    MM    MM    MM    MM    MM  WmmmP"
    M  \`YM'   MM  8M   MM    MM    MM    MM    MM    MM 8M
  .JML. \`'  .JMML.\`Moo9^Yo..JMML..JMML..JMML..JMML  JMML.YMMMMMb
                                                        6'     dP
                                                        Ybmmmd'

    `);
  log(
    `added mailing.config.json in your project with the following contents:
${configJsonString}`
  );
}

/* Preview server config singleton */

type Config = {
  emailsDir: string;
  quiet: boolean;
  port: number;
};

let config: Config | undefined;

export function setConfig(newConfig: typeof config) {
  config = newConfig;
}

export function getConfig(): Config {
  if (undefined === config) {
    throw new Error("config is undefined");
  }
  return config;
}

// This method is useful in cases that config may not be set (like logging on the front-end).
export function getQuiet(): boolean {
  return !!config?.quiet;
}
