import React from "react";
import {
  Mjml,
  MjmlBody,
  MjmlHead,
  MjmlFont,
  MjmlStyle,
  MjmlAttributes,
  MjmlAll,
} from "mjml-react";
import {
  screens,
  themeDefaults,
  spacing,
  colors,
  fontFamily,
  fontSize,
  borderRadius,
} from "../theme";

type BaseLayoutProps = {
  width?: number;
  style?: string;
  children: React.ReactNode;
};

export default function BaseLayout({
  width,
  children,
  style,
}: BaseLayoutProps) {
  return (
    <Mjml>
      <MjmlHead>
        <MjmlFont
          name="neue-haas-unica"
          href="https://use.typekit.net/qqd8jtb.css"
        />
        <MjmlAttributes>
          <MjmlAll {...themeDefaults} />
        </MjmlAttributes>
        <MjmlStyle>{`
          body {
            -webkit-font-smoothing: antialiased;
            min-width: 320px;
            background-color: ${colors.black000};
          }
          a {
            color: inherit
          }
          .gutter {
            padding-left: ${spacing.s7}px;
            padding-right: ${spacing.s7}px;
          }
          .code {
            font-family: ${fontFamily.mono};
            color: ${colors.green200};
            background-color: ${colors.zinc800};
            font-size: ${fontSize.sm}px;
            border-radius: ${borderRadius.sm}px;
            padding: ${spacing.s1}px ${spacing.s3}px;
          }
          .no-wrap {
            white-space: nowrap;
          }
          .hidden {
            display: none;
            max-width: 0px;
            max-height: 0px;
            overflow: hidden;
            mso-hide: all;
          }
          .lg-hidden {
            display: none;
            max-width: 0px;
            max-height: 0px;
            overflow: hidden;
            mso-hide: all;
          }

          /* Large screens */
          @media (min-width:${screens.xs}) {
            .gutter {
              padding-left: ${spacing.s9}px;
              padding-right: ${spacing.s9}px;
            }
            .sm-hidden {
              display: none;
              max-width: 0px;
              max-height: 0px;
              overflow: hidden;
              mso-hide: all;
            }
            .lg-hidden {
              display: block !important;
              max-width: none !important;
              max-height: none !important;
              overflow: visible !important;
              mso-hide: none !important;
            }
          }

          /* Email specific Styles */
          ${style}
      `}</MjmlStyle>
      </MjmlHead>

      <MjmlBody width={width}>{children}</MjmlBody>
    </Mjml>
  );
}
