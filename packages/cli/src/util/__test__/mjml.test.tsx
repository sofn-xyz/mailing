import { Mjml, MjmlBody, MjmlColumn, MjmlImage, MjmlSection } from "mjml-react";
import { render } from "../mjml";

describe("mjml", () => {
  it("should render", () => {
    const { html, errors, lint } = render(
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
    expect(lint).toEqual([]);
  });

  it("should lint relative and localhost images", () => {
    const { errors, lint } = render(
      <Mjml>
        <MjmlBody>
          <MjmlSection>
            <MjmlColumn>
              <MjmlImage src="/ok.png" />
              <MjmlImage src="http://localhost/ok.png" />
            </MjmlColumn>
          </MjmlSection>
        </MjmlBody>
      </Mjml>
    );
    expect(errors).toEqual([]);
    expect(lint).toEqual([
      'image src "/ok.png" is relative and must be absolute',
      'image src "http://localhost/ok.png" uses localhost',
    ]);
  });
});
