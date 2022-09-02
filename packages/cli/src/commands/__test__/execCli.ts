import { execSync } from "child_process";

export default function execCli(command: string): string {
  return execSync(
    `FORCE_COLOR=0 ${__dirname}/../../dev.js ${command}`
  ).toString();
}
