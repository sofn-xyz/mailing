import {
  getOrSetGeneratedAnonymousId,
  getGeneratedAnonymousId,
} from "../anonymousId";
describe("anonymousId", () => {
  it("read and write anonymouse id's", () => {
    // before getOrSetGeneratedAnonymousId has been called, getGeneratedAnonymousId should return undefined
    expect(getGeneratedAnonymousId()).toBe(undefined);

    // getOrSetGeneratedAnonymousId should generate an anonymousId and return it
    const anonymousId = getOrSetGeneratedAnonymousId();
    expect(typeof anonymousId).toBe("string");

    // it should look like a UUID
    expect(anonymousId).toMatch(/[a-z0-9-]+/);
    expect(anonymousId.split(/-/).length).toBe(5);

    // getGeneratedAnonymousId and getOrSetGeneratedAnonymousId should both return the same anonymousId as before
    expect(getOrSetGeneratedAnonymousId()).toBe(anonymousId);
    expect(getGeneratedAnonymousId()).toBe(anonymousId);
  });
});
