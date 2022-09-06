import { readFile, writeFile } from "fs-extra";
import fetch, { Response } from "node-fetch";
import type { AbortSignal } from "node-fetch/externals";
import { WATCH_IGNORE } from "../livereload";

describe("livereload", () => {
  let start: number;
  const controller = new AbortController();
  const signal = controller.signal as AbortSignal;

  beforeEach(() => {
    jest.useRealTimers();
    start = Date.now();
  });
  afterEach(() => {
    jest.clearAllTimers();
  });

  function constructFetch(clock: number) {
    return fetch(
      `http://localhost:3883/should_reload.json?vectorClock=${clock}`,
      {
        headers: { "Content-Type": "application/json" },
        signal,
      }
    );
  }

  async function fetchClock(clock: number) {
    const res = await constructFetch(clock);
    const json = await res.json();
    expect(json["vectorClock"]).toBeGreaterThan(0);
    return json["vectorClock"] as number;
  }

  it("ignores the right files when watching", () => {
    expect(
      WATCH_IGNORE.test(".mailing/src/emails/node_modules/lodash/fp/rest.js")
    ).toBe(true);
    expect(WATCH_IGNORE.test(".next")).toBe(true);
    expect(WATCH_IGNORE.test("node_modules")).toBe(true);
  });

  it("returns pollers immediatly when vectorClock=0", async () => {
    await Promise.all([fetchClock(0), fetchClock(0), fetchClock(0)]);
    expect(Date.now() - start).toBeLessThan(200);
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

  it("does not return poller when a file is touched and vectorClock is ahead", (done) => {
    let rawFetch: Promise<Response> | null;
    setTimeout(async () => {
      try {
        const startClock = await fetchClock(0);
        rawFetch = constructFetch(startClock + 1000000);
        await rawFetch;
        done.fail("fetch should not return");
      } catch {
        // failure is success
      }
    });

    setTimeout(async () => {
      const fileContents = await readFile("./emails/Welcome.tsx");
      await writeFile("./emails/Welcome.tsx", fileContents);
    }, 500); // n.b. this must happen after polling

    setTimeout(async () => {
      // still not returned
      done();
      controller.abort();
    }, 1000);
  });
});
