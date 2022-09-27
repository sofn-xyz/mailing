import { render } from "../index";
import { Mjml, MjmlBody, MjmlRaw } from "mjml-react";

describe("index render", () => {
  it("takes an MJML react component and renders HTML", () => {
    const { html, errors } = render(
      <Mjml>
        <MjmlBody>
          <MjmlRaw>Hello</MjmlRaw>
        </MjmlBody>
      </Mjml>
    );
    expect(html).toContain("<!doctype html>");
    expect(html).toContain("Hello");
    expect(errors.length).toBe(0);
  });
});
