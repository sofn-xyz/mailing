import {
  Mjml,
  MjmlBody,
  MjmlButton,
  MjmlColumn,
  MjmlImage,
  MjmlSection,
} from "mjml-react";
import { render } from "../mjml";

describe("mjml", () => {
  it("should render", () => {
    const { html, errors, htmlLint } = render(
      <Mjml>
        <MjmlBody>
          <MjmlSection>
            <MjmlColumn>
              <MjmlImage src="http://mailing.run/ok.png" />
            </MjmlColumn>
          </MjmlSection>
        </MjmlBody>
      </Mjml>
    );
    expect(html).toMatchSnapshot();
    expect(errors).toEqual([]);
    expect(htmlLint).toEqual([]);
  });

  it("should lint relative and localhost images", () => {
    const { errors, htmlLint } = render(
      <Mjml>
        <MjmlBody>
          <MjmlSection>
            <MjmlColumn>
              <MjmlImage src="/ok.png" />
              <MjmlImage src="http://localhost/ok.png" />
              <MjmlButton href="http://localhost:3000/21">A button</MjmlButton>
              <MjmlButton href="/ok.png" />
              <MjmlButton href="tel:8888888888" />
              <MjmlButton href="mailto:example@ok.com" />
            </MjmlColumn>
          </MjmlSection>
        </MjmlBody>
      </Mjml>
    );
    expect(errors).toEqual([]);
    expect(htmlLint.length).toEqual(4);
    expect(htmlLint).toMatchSnapshot();
  });
});
