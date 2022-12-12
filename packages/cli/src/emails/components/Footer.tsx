import React from "react";
import {
  MjmlSection,
  MjmlWrapper,
  MjmlColumn,
  MjmlText,
  MjmlImage,
  MjmlGroup,
} from "mjml-react";
import Link from "./Link";
import { colors, fontSize, fontWeight } from "../theme";
import { EMAIL_PREFERENCES_URL } from "mailing-core";

type FooterProps = {
  includeUnsubscribe?: boolean;
};

export default function Footer({ includeUnsubscribe = false }: FooterProps) {
  return (
    <>
      <MjmlWrapper
        backgroundColor={colors.gray800}
        borderBottom={`2px solid ${colors.black}`}
      >
        <MjmlSection>
          <MjmlGroup>
            <MjmlColumn
              padding={"48px 0"}
              borderRight={`2px solid ${colors.black}`}
            >
              <MjmlText
                align="center"
                fontSize={fontSize.xs}
                color={colors.slate400}
                fontWeight={fontWeight.bold}
                paddingBottom={8}
                textTransform="uppercase"
              >
                Help & Bugs
              </MjmlText>
              <MjmlText align="center">
                <Link
                  color={colors.white}
                  fontSize={fontSize.sm}
                  href="https://discord.gg/fdSzmY46wY"
                >
                  <img
                    height={12}
                    width={16}
                    src={"https://mailing.run/welcome-template/discord.png"}
                    alt=""
                    style={{
                      verticalAlign: "text-bottom",
                      paddingRight: 6,
                      paddingBottom: 4,
                    }}
                  />
                  Discord
                </Link>
              </MjmlText>
            </MjmlColumn>
            <MjmlColumn padding={"48px 0"}>
              <MjmlText
                align="center"
                fontSize={fontSize.xs}
                color={colors.slate400}
                fontWeight={fontWeight.bold}
                paddingBottom={8}
                textTransform="uppercase"
              >
                What we&rsquo;re up to
              </MjmlText>
              <MjmlText align="center">
                <Link
                  fontSize={fontSize.sm}
                  color={colors.white}
                  href="https://github.com/sofn-xyz/mailing/issues"
                >
                  <img
                    height={16}
                    width={16}
                    src={"https://mailing.run/welcome-template/github.png"}
                    alt=""
                    style={{
                      verticalAlign: "text-bottom",
                      paddingRight: 6,
                      paddingBottom: 2,
                    }}
                  />
                  Issues
                </Link>
              </MjmlText>
            </MjmlColumn>
          </MjmlGroup>
        </MjmlSection>
      </MjmlWrapper>

      <MjmlWrapper backgroundColor={colors.gray800}>
        <MjmlSection paddingTop={32} paddingBottom={24} cssClass="gutter">
          <MjmlColumn>
            <MjmlText
              align="center"
              fontSize={fontSize.xs}
              color={colors.slate400}
              fontWeight={fontWeight.bold}
              textTransform="uppercase"
            >
              Mailing {new Date().getFullYear()}
            </MjmlText>

            {includeUnsubscribe && (
              <MjmlText
                align="center"
                fontSize={fontSize.xs}
                color={colors.slate400}
                paddingTop={12}
              >
                You&rsquo;re receiving this email because you asked for
                occasional updates about Mailing. If you don&rsquo;t want to
                receive these in the future, you can{" "}
                <Link
                  color={colors.slate400}
                  textDecoration="underline"
                  href={EMAIL_PREFERENCES_URL}
                >
                  unsubscribe.
                </Link>
              </MjmlText>
            )}
          </MjmlColumn>
        </MjmlSection>

        <MjmlSection paddingBottom={40}>
          <MjmlColumn>
            <MjmlImage
              height={16}
              width={13}
              src={"https://mailing.run/welcome-template/logo.png"}
              href="https://mailing.run"
            />
          </MjmlColumn>
        </MjmlSection>
      </MjmlWrapper>
    </>
  );
}
