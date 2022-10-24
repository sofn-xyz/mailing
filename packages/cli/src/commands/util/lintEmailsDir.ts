import { readdir } from "fs-extra";
import { compact, flatten } from "lodash";
import { resolve } from "path";
import { error, log } from "../../util/log";

// The Linter: define linting rules here

function formatErr(err: Error) {
  return compact([err.name, err.message, err.cause, err.stack]).join("\n");
}

async function ensureMatchingNamedExports(
  emailsDir: string
): Promise<(string | Error)[]> {
  // For analytics we want template components to be named
  // correctly. This catches a common mistake of naming them
  // incorrectly.

  const errors = [];

  const paths = await readdir(emailsDir);
  for (const path of paths) {
    if (path.match(/\.[tj]sx/) && !path.match(/\.test\.[tj]sx/)) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const component = require(resolve(emailsDir, path));
        const filename = path.replace(/.[jt]sx/, "");
        const name = filename[0].toUpperCase() + filename.slice(1);
        if (component.default.name !== name) {
          errors.push(
            [
              `Template ${path} has no matching default export.`,
              `The default export component should be named ${name}.`,
              `This name will be used by mailing for analytics.`,
            ].join("\n")
          );
        }
      } catch (e) {
        if (e instanceof Error) {
          errors.push(formatErr(e));
        } else {
          throw e;
        }
      }
    }
  }

  return errors; // [] if no errors
}

export async function lintEmailsDirectory(emailsDir: string) {
  log(`linting templates in ${emailsDir}...`);

  // run linters async
  const linters = [ensureMatchingNamedExports(emailsDir)];
  const errors = flatten(await Promise.all(linters));

  // log errors after all linters run
  if (errors.length > 0) {
    const errorDescriptions = errors
      .map((e, i) => `${i + 1}. ${formatErr(e)}\n\n`)
      .join("");
    error(`${errors.length} lint errors\n\n${errorDescriptions}`);
    process.exit(1);
  }
}
