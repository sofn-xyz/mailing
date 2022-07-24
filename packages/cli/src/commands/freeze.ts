import { ArgumentsCamelCase } from "yargs";
import { log } from "../log";
import { execSync } from "child_process";
import { handler as previewHandler } from "./preview";
import { spawn } from "child_process";

export const command = ["freeze"];

export const describe = "export a static version of mailing prev";

export const handler = async (args: ArgumentsCamelCase<{}>) => {
  log("starting build");
  // previewHandler({ ...args, quiet: true });
  execSync(
    "cd ./node_modules/mailing &&\
     NEXT_PUBLIC_STATIC=1 npx next build &&\
     NEXT_PUBLIC_STATIC=1 npx next export &&\
     mkdir ../../mailing-nextjs-freeze &&\
     mv out/* ../../mailing-nextjs-freeze"
  );
  log("ok!");
};
