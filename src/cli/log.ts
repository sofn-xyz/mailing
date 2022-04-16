import chalk from "chalk";

export default function log(message?: any, ...optionalParams: any[]) {
  console.log(chalk.blue("[mailing]"), message, ...optionalParams);
}
