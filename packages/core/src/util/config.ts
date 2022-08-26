import { readFile } from "fs-extra";

type Config = {
  emailsDir: string;
  quiet: boolean;
  port: number;
  anonymousId: string | null | undefined;
};

export async function getConfig() {
  // prettier-ignore
  try {
    const config = await readFile("./mailing.config.json");
    return JSON.parse(config.toString());
  } catch (e: any) {
    if (e.code === "ENOENT") return; // file does not exist
    throw e;
  }
}
