import { flatten } from "lodash";
import manifest from "../../moduleManifest";
import { error, log } from "../../util/serverLogger";

// The Linter: define linting rules here

async function ensureMatchingNamedExports(): Promise<string[]> {
  // For analytics we want template components to be named
  // correctly. This catches a common mistake of naming them
  // different from the file they're in which indicates that
  // a naming mistake has been made.

  const errors = [];
  const { templates } = manifest;

  for (const templateName of Object.keys(templates)) {
    const template = templates[templateName as keyof typeof templates];
    if (template.name !== templateName) {
      errors.push(
        [
          `Template ${templateName} has no matching default export.`,
          `Found default export ${template.name} but both the file`,
          `and default export component should have the same name.`,
          `This name will be used by mailing for analytics.`,
        ].join("\n")
      );
    }
  }

  return errors; // [] if no errors
}

export async function lintEmailsDirectory(emailsDir: string) {
  log(`linting templates in ${emailsDir}...`);

  // run linters async
  const linters = [ensureMatchingNamedExports()];
  const errors = flatten(await Promise.all(linters));

  // log errors after all linters run
  if (errors.length > 0) {
    const errorDescriptions = errors
      .map((e, i) => `${i + 1}. ${e}\n\n`)
      .join("");
    error(
      `${errors.length} lint error${
        errors.length > 1 ? "s" : ""
      }\n\n${errorDescriptions}`
    );
    process.exit(1);
  }
}
