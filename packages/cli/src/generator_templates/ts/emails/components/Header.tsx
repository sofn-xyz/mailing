import React from "react";
import { MjmlSection, MjmlColumn, MjmlImage } from "mjml-react";

export default function Header() {
  return (
    <MjmlSection padding="48px 0 40px">
      <MjmlColumn>
        <MjmlImage
          padding="0 24px 0"
          width="146"
          height="32"
          align="left"
          src="https://s3.amazonaws.com/lab.campsh.com/mailing-logo%402x.png"
        />
      </MjmlColumn>
    </MjmlSection>
  );
}
