import {
  Mjml,
  MjmlBody,
  MjmlHead,
  MjmlFont,
  MjmlStyle,
  MjmlAttributes,
  MjmlAll,
} from "@faire/mjml-react";
import { colors, spacing, screens, themeDefaults } from "../theme";
import cssHelpers from "../util/cssHelpers";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Mjml>
      <MjmlHead>
        <MjmlFont
          name="neue-haas-unica"
          href="https://use.typekit.net/fih5ejy.css"
        />
        <MjmlStyle>{`
          body {
            background-color: ${colors.black000};
          }
          .bg-none {
            background: none !important;
          }
          .gutter {
            padding-left: ${spacing.mobileGutter}px !important;
            padding-right: ${spacing.mobileGutter}px !important;
          }
          @media (min-width: ${screens.xs}) {
            .gutter {
              padding-left: ${spacing.desktopGutter}px !important;
              padding-right: ${spacing.desktopGutter}px !important;
            }
          }

          ${cssHelpers}
      `}</MjmlStyle>
        <MjmlAttributes>
          <MjmlAll {...themeDefaults} />
        </MjmlAttributes>
      </MjmlHead>

      <MjmlBody width={600}>{children}</MjmlBody>
    </Mjml>
  );
}
