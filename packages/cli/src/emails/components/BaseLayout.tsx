import React from "react";
import {
  Mjml,
  MjmlBody,
  MjmlHead,
  MjmlFont,
  MjmlStyle,
  MjmlAttributes,
  MjmlAll,
  MjmlRaw,
  MjmlPreview,
} from "mjml-react";
import { colors, screens, themeDefaults, spacing } from "../theme";

type BaseLayoutProps = {
  width: number;
  children: React.ReactNode;
  preview?: string;
};

export default function BaseLayout({
  width,
  children,
  preview,
}: BaseLayoutProps) {
  return (
    <Mjml>
      <MjmlHead>
        {preview && <MjmlPreview>{preview}</MjmlPreview>}
        <MjmlRaw>
          <meta name="color-scheme" content="light dark" />
          <meta name="supported-color-schemes" content="light dark" />
        </MjmlRaw>
        <MjmlFont
          name="Inter"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700"
        />
        <MjmlAttributes>
          <MjmlAll {...themeDefaults} />
        </MjmlAttributes>
        <MjmlStyle>{`
          body {
            -webkit-font-smoothing: antialiased;
          }
          a {
            color: inherit
          }
          .gutter {
            padding-left: ${spacing.s7}px;
            padding-right: ${spacing.s7}px;
          }
          .no-wrap {
            white-space: nowrap;
          }
          .dark-mode {
            display: none;
            max-width: 0px;
            max-height: 0px;
            overflow: hidden;
            mso-hide: all;
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
            .lg-gutter {
              padding-left: ${spacing.s7}px !important;
              padding-right: ${spacing.s7}px !important;
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

          /* Dark Mode */
          @media (prefers-color-scheme: dark) {
            body {
              background: ${colors.black};
            }
            .invert > * {
              filter: invert(1) !important;
            }
            .text > * {
              color: #fff !important;
            }
            .dark-mode {
              display: inherit !important;
              max-width: none !important;
              max-height: none !important;
              overflow: visible !important;
              mso-hide: none !important;
            }
            .light-mode {
              display: none;
              max-width: 0px;
              max-height: 0px;
              overflow: hidden;
              mso-hide: all;
            }
          }
      `}</MjmlStyle>
      </MjmlHead>

      <MjmlBody width={width}>{children}</MjmlBody>
    </Mjml>
  );
}
