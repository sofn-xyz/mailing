import { exec } from "child_process";

export default async function execCli(command, opts) {
  return new Promise((resolve, reject) => {
    const child = exec(`FORCE_COLOR=0 npx mailing ${command}`);
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
        console.log(out);
        console.error(err);
        reject(new Error(`${command} exited with code ${code}`));
      }
      resolve(out);
    });
  });
}
