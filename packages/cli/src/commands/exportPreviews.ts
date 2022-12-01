/* eslint-disable @typescript-eslint/no-var-requires */
import { resolve } from "path";
import { outputFile, readdirSync } from "fs-extra";
import { ArgumentsCamelCase } from "yargs";
import { getPreviewsDirectory } from "../util/paths";
import { error, log } from "../util/serverLogger";
import { render } from "../util/mjml";
import registerRequireHooks from "./util/registerRequireHooks";
import { defaults } from "../util/config";
import { buildHandler } from "../util/buildHandler";
import { minify } from "html-minifier-terser";

export type ExportPreviewsArgs = ArgumentsCamelCase<{
  emailsDir?: string;
  outDir?: string;
  quiet?: boolean;
  minify?: boolean;
  anonymousId?: string | null;
  skipLint?: boolean;
}>;

export const command = "export-previews";

export const builder = {
  "emails-dir": {
    default: defaults().emailsDir,
    description: "the directory of your email templates",
  },
  "out-dir": {
    default: defaults().outDir,
    description: "directory in which we output the html",
  },
  minify: {
    default: false,
    boolean: true,
    description: "minify the html",
  },
  quiet: {
    default: defaults().quiet,
    descriptioin: "less output",
    boolean: true,
  },
  "skip-lint": {
    default: false,
    boolean: true,
    description: "skip linting",
  },
};

export const describe = "export previews as html";

function camelToSnakeCase(str: string) {
  return str
    .replace(/[A-Z]/g, (letter: string) => `_${letter.toLowerCase()}`)
    .replace(/^_/, "");
}

export function previewFilename(moduleName: string, functionName: string) {
  return camelToSnakeCase(
    `${moduleName.replace(/\.[j|t]sx/, "")}_${functionName}.html`
  );
}

export const handler = buildHandler(
  async (argv: ExportPreviewsArgs) => {
    if (!argv.outDir) throw new Error("outDir option is not set");

    const outDir = argv.outDir;

    if (typeof outDir !== "string") {
      error("please specify an outDir like --outDir ./html");
      return;
    }

    if (undefined === argv.emailsDir) {
      error("please specific an emailsDir like --emailsDir ./emails");
      return;
    }

    const previewsPath = getPreviewsDirectory(argv.emailsDir);
    if (!previewsPath) {
      error(
        "Could not find emails directory. Have you initialized the project with `mailing init`?"
      );
      return;
    }

    registerRequireHooks();

    const previewText = argv.minify ? "minified preview html" : "preview html";

    let count = 0;

    const lint: { [filename: string]: HtmlLintError[] } = {};
    const toWrite: Array<() => Promise<void>> = [];
    const filenames: string[] = [];

    const previewRenders = readdirSync(previewsPath)
      .filter((path) => !/^\./.test(path))
      .flatMap((p) => {
        const previewPath = resolve(previewsPath, p);
        const previewModule = require(previewPath);

        return Object.keys(require(previewPath)).flatMap(
          async (previewFunction) => {
            const filename = previewFilename(p, previewFunction);
            count++;

            const { html, errors, htmlLint } = render(
              await previewModule[previewFunction]()
            );
            if (errors.length) {
              error(`MJML errors rendering ${filename}:`, errors);
            }

            if (htmlLint.length && !argv.skipLint) {
              lint[filename] = htmlLint;
            }

            const minifyConfig = {
              collapseWhitespace: true,
              minifyCSS: false,
              caseSensitive: true,
              removeEmptyAttributes: true,
            };

            const outHtml = argv.minify
              ? await minify(html, minifyConfig)
              : html;
            filenames.push(filename);
            toWrite.push(async () =>
              outputFile(resolve(outDir, filename), outHtml)
            );
          }
        );
      });
    await Promise.all(previewRenders);

    const lintCount = Object.keys(lint).length;
    if (lintCount) {
      error(
        lintCount > 1
          ? `Aborted because ${lintCount} files have lint errors:`
          : `Aborted because 1 file has lint errors:`,
        "\n\n",
        Object.entries(lint)
          .map(
            ([filename, errors]) =>
              `${filename}\n${errors
                .map((e, i) => `   ${i + 1}. ${e.message}`)
                .join("\n\n")}`
          )
          .join("\n\n"),
        "\n\n"
      );

      return;
    }

    log(`Exporting ${previewText} to`);
    log(`${outDir}/`);
    await Promise.all(toWrite.map((f) => f()));
    for (const f of filenames.sort()) {
      log(`  |-- ${f}`);
    }
    log(`✅ Processed ${count} previews\n`);
  },
  {
    captureOptions: () => {
      return { event: "export-previews invoked" };
    },
  }
);
