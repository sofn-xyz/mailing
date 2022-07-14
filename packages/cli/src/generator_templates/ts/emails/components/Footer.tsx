import React from "react";
import { MjmlSection, MjmlColumn, MjmlText } from "mjml-react";

export default function Footer() {
  return (
    <MjmlSection cssClass="smooth">
      <MjmlColumn>
        <MjmlText
          cssClass="footer"
          padding="0 24px 48px"
          fontSize={14}
          color="#777"
        >
          © 2022 Mailing&nbsp;&nbsp;·&nbsp;&nbsp;
          <a href="#" target="_blank">
            Unsubscribe
          </a>
        </MjmlText>
      </MjmlColumn>
    </MjmlSection>
  );
}
