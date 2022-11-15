import { MjmlSection, MjmlColumn, MjmlText } from "mjml-react";
import { grayDark, textSm } from "./theme";
import { EMAIL_PREFERENCES_URL } from "mailing-core";

export default function Footer() {
  return (
    <MjmlSection cssClass="smooth">
      <MjmlColumn>
        <MjmlText
          cssClass="footer"
          padding="24px 24px 48px"
          fontSize={textSm}
          color={grayDark}
        >
          © {new Date().getFullYear()} BookBook&nbsp;&nbsp;·&nbsp;&nbsp;
          <a href={EMAIL_PREFERENCES_URL} target="_blank" rel="noreferrer">
            Unsubscribe
          </a>
        </MjmlText>
      </MjmlColumn>
    </MjmlSection>
  );
}