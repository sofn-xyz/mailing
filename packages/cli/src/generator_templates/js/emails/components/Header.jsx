import React from "react";
import { MjmlColumn, MjmlGroup, MjmlSection, MjmlWrapper } from "mjml-react";
import Text from "./Text";
import Link from "./Link";
import { colors, fontSize, lineHeight } from "../theme";

export default function Header() {
  return (
    <MjmlWrapper padding="40px 0 64px">
      <MjmlSection cssClass="gutter">
        <MjmlGroup>
          <MjmlColumn width="42%">
            <Text align="left">
              <Link
                color={colors.white}
                fontSize={fontSize.xl}
                href="https://mailing.run"
                textDecoration="none"
              >
                <img
                  height={24}
                  width={20}
                  src={"https://emails.mailing.run/assets/logo.png"}
                  alt=""
                  style={{
                    verticalAlign: "text-bottom",
                    paddingRight: 10,
                    paddingBottom: 2,
                  }}
                />
                Mailing
              </Link>
            </Text>
          </MjmlColumn>
          <MjmlColumn width="58%">
            <Text
              align="right"
              fontSize={fontSize.xs}
              lineHeight={lineHeight.tight}
            >
              The open source email
              <br />
              platform for teams that code
            </Text>
          </MjmlColumn>
        </MjmlGroup>
      </MjmlSection>
    </MjmlWrapper>
  );
}
