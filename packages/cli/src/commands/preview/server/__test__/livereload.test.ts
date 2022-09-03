import { WATCH_IGNORE } from "../livereload";

jest.useFakeTimers();

describe("livereload", () => {
  it("ignores the right files when watching", () => {
    expect(
      WATCH_IGNORE.test(".mailing/src/emails/node_modules/lodash/fp/rest.js")
    ).toBe(true);
    expect(WATCH_IGNORE.test(".next")).toBe(true);
    expect(WATCH_IGNORE.test("node_modules")).toBe(true);
  });
});
