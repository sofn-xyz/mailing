import renderTemplate from "../renderTemplate";

jest.mock("../../moduleManifest");

describe("renderTemplate", () => {
  it("throws an error if template not found", () => {
    const { error, mjmlErrors, html } = renderTemplate("test", {
      name: "test",
    });
    expect(html).toBeUndefined();
    expect(mjmlErrors).toBeUndefined();
    expect(error).toMatch(/Template test not found in list of templates/);
  });

  it("returns rendered html", () => {
    const { error, mjmlErrors, html } = renderTemplate("AccountCreated", {
      name: "Test User",
    });
    expect(mjmlErrors).toBeUndefined();
    expect(error).toBeUndefined();
    expect(html).not.toBeUndefined();
    expect(html).toMatchSnapshot();
  });
});
