import instrumentHtml from "../instrumentHtml";

describe("instrumentHtml", () => {
  const sendId = "123";
  const apiUrl = "https://api.com";

  it("should instrument html", () => {
    const html = `
    <html>
      <head>
        <title>Test</title>
      </head>
      <body>
        <a href="https://google.com">Google</a>
        <a href="https://yahoo.com">Yahoo</a>
      </body>
    </html>
  `;

    const result = instrumentHtml({ html, sendId, apiUrl });

    expect(result).toContain(
      'href="https://api.com/api/hooks/click?sendId=123&url=https%3A%2F%2Fgoogle.com"'
    );
    expect(result).not.toContain('href="https://google.com"');
    expect(result).toContain(
      '<img alt="" src="https://api.com/api/hooks/open?sendId=123" >'
    );

    expect(result).toMatchSnapshot();
  });

  it("throws error if no body found", () => {
    const html = `
      <html>
        <head>
          <title>Test</title>
        </head>
      </html>
    `;

    expect(() => instrumentHtml({ html, sendId, apiUrl })).toThrow();
  });
});
