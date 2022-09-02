import { existsSync } from "fs-extra";
import { readPackageJSON } from "./paths";
import { readFileSync, writeFileSync } from "fs-extra";
import { log, error, logPlain } from "./log";
import { pick } from "lodash";
import * as prettier from "prettier";
import { randomUUID } from "crypto";

export const MAILING_CONFIG_FILE = "./mailing.config.json";

type ConfigDefaults = {
  typescript: boolean;
  emailsDir: string;
  outDir: string;
  port: number;
  quiet: boolean;
  anonymousId: string;
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
      anonymousId: getGeneratedAnonymousId(),
    };
  return DEFAULTS;
}

// options to include in the default config file
const DEFAULT_KEYS_FOR_CONFIG_FILE = [
  "typescript",
  "emailsDir",
  "outDir",
  "anonymousId",
];

// an object to JSON stringify and write to the default config file
function defaultsForConfigFile() {
  return pick(defaults(), DEFAULT_KEYS_FOR_CONFIG_FILE);
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
  if (existsSync(MAILING_CONFIG_FILE)) {
    // read the JSON object
    const json = JSON.parse(readFileSync(MAILING_CONFIG_FILE).toString());

    // check if anonymousId in JSON object
    if (!("anonymousId" in json)) {
      // if not, add it
      json.anonymousId = getGeneratedAnonymousId();

      // ... and overwrite the JSON file
      const configJsonString = prettier.format(JSON.stringify(json), {
        parser: "json",
        printWidth: 0,
      });

      writeFileSync(MAILING_CONFIG_FILE, configJsonString);
    }
  } else {
    const configJsonString = prettier.format(
      JSON.stringify(defaultsForConfigFile()),
      {
        parser: "json",
        printWidth: 0,
      }
    );

    writeFileSync(MAILING_CONFIG_FILE, configJsonString);

    logPlain(`
    ███╗   ███╗ █████╗ ██╗██╗     ██╗███╗   ██╗ ██████╗ 
    ████╗ ████║██╔══██╗██║██║     ██║████╗  ██║██╔════╝ 
    ██╔████╔██║███████║██║██║     ██║██╔██╗ ██║██║  ███╗
    ██║╚██╔╝██║██╔══██║██║██║     ██║██║╚██╗██║██║   ██║
    ██║ ╚═╝ ██║██║  ██║██║███████╗██║██║ ╚████║╚██████╔╝
    ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝ 
    
        `);
    log(
      `added mailing.config.json to your project with the following contents:
${configJsonString}`
    );
  }
}

/* 
  Functions for generating an anonymousId and get/set to a singleton
  this is necessary to report analytics the first time you run init,
  when you had no config and so argv has no anonymousId set 
*/

let generatedAnonymousId = null;

export function getGeneratedAnonymousId() {
  if (generatedAnonymousId) return generatedAnonymousId;

  const id = randomUUID();
  generatedAnonymousId = id;
  return id;
}

/* Preview server config singleton */

type Config = {
  emailsDir: string;
  quiet: boolean;
  port: number;
};

let config: Config | undefined;

export function setConfig(newConfig: Config) {
  config = newConfig;
}

export function getConfig(): Config {
  if (undefined === config) {
    throw new Error("config is undefined");
  }
  return config;
}
