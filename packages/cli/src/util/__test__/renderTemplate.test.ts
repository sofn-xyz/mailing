import renderTemplate from "../renderTemplate";

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
    // Freeze the clock so the footer's "© {year}" copyright renders
    // deterministically — otherwise this snapshot rots every Jan 1.
    jest.useFakeTimers().setSystemTime(new Date("2023-06-15T00:00:00Z"));
    try {
      const { error, mjmlErrors, html } = renderTemplate("AccountCreated", {
        name: "Test User",
      });
      expect(mjmlErrors).toEqual([]);
      expect(error).toBeUndefined();
      expect(html).not.toBeUndefined();
      expect(html).toMatchSnapshot();
    } finally {
      jest.useRealTimers();
    }
  });
});
