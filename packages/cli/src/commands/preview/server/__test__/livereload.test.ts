import { appendFile, readFile, writeFile } from "fs-extra";
import fetch from "node-fetch";
import { WATCH_IGNORE } from "../livereload";

describe("livereload", () => {
  let start: number;

  async function fetchClock(clock: number) {
    const res = await fetch(
      `http://localhost:3883/should_reload.json?vectorClock=${clock}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const json = await res.json();
    expect(json["vectorClock"]).toBeGreaterThan(0);
    return json["vectorClock"] as number;
  }

  beforeEach(() => {
    jest.useRealTimers();
    start = Date.now();
  });

  it("ignores the right files when watching", () => {
    expect(
      WATCH_IGNORE.test(".mailing/src/emails/node_modules/lodash/fp/rest.js")
    ).toBe(true);
    expect(WATCH_IGNORE.test(".next")).toBe(true);
    expect(WATCH_IGNORE.test("node_modules")).toBe(true);
  });

  it("returns pollers immediatly when vectorClock=0", async () => {
    await Promise.all([fetchClock(0), fetchClock(0), fetchClock(0)]);
    expect(Date.now() - start).toBeLessThan(100);
  });

  it("returns pollers immediatly when vectorClock=0", (done) => {
    setTimeout(async () => {
      const startClock = await fetchClock(0);
      await Promise.all([
        fetchClock(startClock),
        fetchClock(startClock),
        fetchClock(startClock),
      ]);
      expect(Date.now() - start).toBeLessThan(1000);
      expect(Date.now() - start).toBeGreaterThan(100);
      done();
    }, 0);

    setTimeout(async () => {
      const fileContents = await readFile("./emails/Welcome.tsx");
      await writeFile("./emails/Welcome.tsx", fileContents);
    }, 100); // n.b. this must happen after polling
  });

  // it("does not return pollers when a file is touched and vectorClock is ahead", async () => {
  // });
});
