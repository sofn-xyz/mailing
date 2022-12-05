import { getAnchor } from "../getAnchor";

describe("getAnchor", () => {
  it("should return an anchor", () => {
    expect(getAnchor("Hello World")).toBe("hello-world");
  });
  it("should return an anchor with /, replace special characters at start and end", () => {
    expect(getAnchor("/api/render/ ")).toBe("api-render");
  });
});
