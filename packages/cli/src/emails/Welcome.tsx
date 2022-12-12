import React from "react";
import { MjmlColumn, MjmlSection, MjmlSpacer, MjmlWrapper } from "mjml-react";
import BaseLayout from "./components/BaseLayout";
import Button from "./components/Button";
import Footer from "./components/Footer";
import Heading from "./components/Heading";
import Header from "./components/Header";
import Text from "./components/Text";
import { fontSize, colors, spacing, fontFamily, screens } from "./theme";

const welcomeStyle = `
  .h1 > * {
    font-size: 56px !important;
  }
  .h2 > * {
    font-size: ${fontSize.lg}px !important;
  }
  .p > * {
    font-size: ${fontSize.base}px !important;
  }

  @media (min-width:${screens.xs}) {
    .h1 > * {
      font-size: 84px !important;
    }
    .h2 > * {
      font-size: ${fontSize.xxl}px !important;
    }
    .p > * {
      font-size: ${fontSize.md}px !important;
    }
  }
`;

type WelcomeProps = {
  includeUnsubscribe?: boolean;
};

const Welcome = ({ includeUnsubscribe }: WelcomeProps) => {
  return (
    <BaseLayout width={600} style={welcomeStyle}>
      <Header />
      <MjmlWrapper backgroundColor={colors.black}>
        <MjmlSection paddingBottom={spacing.s11} cssClass="gutter">
          <MjmlColumn>
            <Heading maxWidth={420} cssClass="h1" fontFamily={fontFamily.serif}>
              Thank you <br />
              for installing <br />
              Mailing :)
            </Heading>
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection paddingBottom={spacing.s11} cssClass="gutter">
          <MjmlColumn>
            <Heading cssClass="h2" paddingBottom={spacing.s6}>
              <span style={{ color: colors.green300 }}>●</span> This is the
              Preview Viewer
            </Heading>
            <Text
              cssClass="p"
              fontSize={fontSize.md}
              paddingBottom={spacing.s7}
            >
              It shows previews from{" "}
              <span className="code">emails/previews</span>. Keep it open while
              you build your emails and it’ll live reload as you develop. To see
              it in action with this preview, make a change to{" "}
              <span className="code">emails/previews/Welcome.tsx</span>. You can
              deploy your Mailing server to Vercel or Netlify to share the
              Preview Viewer with your team.
            </Text>

            <Button
              href="https://github.com/sofn-xyz/mailing-templates"
              backgroundColor={colors.green300}
              align="left"
              cssClass="sm-hidden"
            >
              More Demo Templates{"  "}
              <span style={{ fontFamily: fontFamily.serif }}>&rarr;</span>
            </Button>
            <MjmlSpacer height={spacing.s3} cssClass="lg-hidden" />
            <Button
              href="https://github.com/sofn-xyz/mailing-templates"
              backgroundColor={colors.green300}
              align="right"
              cssClass="lg-hidden"
            >
              More Demo Templates{"  "}
              <span style={{ fontFamily: fontFamily.serif }}>&rarr;</span>
            </Button>
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection paddingBottom={spacing.s11} cssClass="gutter">
          <MjmlColumn>
            <Heading cssClass="h2" paddingBottom={spacing.s6}>
              <span style={{ color: colors.blue }}>●</span> Analytics and
              unsubscribe
            </Heading>
            <Text cssClass="p" paddingBottom={spacing.s7}>
              Mailing Platform gives you analytics and drop-in unsubscribe links
              + subscription preferences, so your users can control what email
              they receive. When you try to send an email to an unsubscribed
              user, Mailing will intelligently block the send.
            </Text>
            <Button
              href="https://mailing.run/docs"
              align="left"
              backgroundColor={colors.blue}
              cssClass="sm-hidden"
            >
              Check out the Docs{"  "}
              <span style={{ fontFamily: fontFamily.serif }}>&rarr;</span>
            </Button>
            <MjmlSpacer height={spacing.s3} cssClass="lg-hidden" />
            <Button
              href="https://mailing.run/docs"
              align="right"
              backgroundColor={colors.blue}
              cssClass="lg-hidden"
            >
              Check out the Docs{"  "}
              <span style={{ fontFamily: fontFamily.serif }}>&rarr;</span>
            </Button>
            <MjmlSpacer height={spacing.s9} />
          </MjmlColumn>
        </MjmlSection>
      </MjmlWrapper>
      <Footer includeUnsubscribe={includeUnsubscribe} />
    </BaseLayout>
  );
};
Welcome.subject = "Thank you for installing Mailing :)";
export default Welcome;
