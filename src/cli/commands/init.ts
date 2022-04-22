import { existsSync, copySync, readFileSync } from "fs-extra";
import prompts from "prompts";
import log from "../log";
import { getPackageJSON } from "../../paths";
import {
  generateEmailsDirectory,
  generateNextPages,
  getPagesDirPath,
} from "../generators";

function looksLikeTypescriptProject() {
  if (existsSync("./tsconfig.json")) {
    return true;
  }

  const pkg = getPackageJSON();
  return !!(pkg.devDependencies?.typescript || pkg.dependencies?.typescript);
}

const looksLikeNextJSProject = () => {
  const hasNextDependency = !!getPackageJSON().dependencies?.next;
  return hasNextDependency && !!getPagesDirPath();
};

export const command = ["$0", "init"];

export const describe = "initialize mailing in your app";

export const handler = async () => {
  // add preview to pages dir
  // add emails dir
  // open preview page??

  // check if emails directory already exists
  if (!existsSync("./package.json")) {
    log("No package.json found. Please run from the project root.");
    return;
  }

  if (!looksLikeNextJSProject()) {
    log("Please run from the root directory of a next.js project.");
    return;
  }

  const ts = await prompts({
    type: "confirm",
    name: "value",
    message: "Are you using typescript?",
    initial: looksLikeTypescriptProject(),
  });

  const options = { isTypescript: ts.value };
  await generateEmailsDirectory(options);
  await generateNextPages(options);

  log("Looks good. Start your app and visit /mailing to see previews. Bye!");
};
