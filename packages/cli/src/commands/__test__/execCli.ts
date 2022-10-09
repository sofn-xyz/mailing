import { exec } from "child_process";

export async function execCli(command: string, opts?: { debug: boolean }) {
  return new Promise((resolve, reject) => {
    const child = exec(
      `cd packages/cli && FORCE_COLOR=0 ${__dirname}/../../dev.js ${command}`
    );
    let out = "";
    let err = "";
    child.stdout?.on("data", (stream) => {
      out += stream.toString();
      if (opts?.debug) console.log(out);
    });
    child.stderr?.on("data", (stream) => {
      err += stream.toString();
      if (opts?.debug) console.log(out);
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code) {
        if (opts?.debug) {
          console.log(out);
          console.error(err);
        }
        reject(new Error(err));
      }
      resolve(out);
    });
  });
}

export function execCliChild(command: string, _opts?: { debug: boolean }) {
  return exec(`FORCE_COLOR=0 ${__dirname}/../../dev.js ${command}`);
}
