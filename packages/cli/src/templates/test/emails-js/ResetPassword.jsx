import React from "react";
import { MjmlSection, MjmlColumn } from "mjml-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Button from "./components/Button";
import Text from "./components/Text";
import BaseLayout from "./components/BaseLayout";
import Divider from "./components/Divider";
import { spacing } from "./theme";

const ResetPassword = ({ name, body, ctaText }) => {
  return (
    <BaseLayout width={352}>
      <Header />
      <MjmlSection cssClass="gutter">
        <MjmlColumn>
          <Divider paddingTop={spacing.s3} paddingBottom={spacing.s5} />
          <Text paddingTop={spacing.s5} paddingBottom={spacing.s5}>
            Hello {name},
          </Text>
          <Text paddingBottom={spacing.s7}>
            <>{body}</>
          </Text>
          <Button href="https://www.mailing.run">{ctaText}</Button>
          <Text paddingTop={spacing.s7} paddingBottom={spacing.s5}>
            ♥,
            <br />
            The BookBook Team
          </Text>
          <Divider paddingTop={spacing.s5} />
        </MjmlColumn>
      </MjmlSection>
      <Footer />
    </BaseLayout>
  );
};
ResetPassword.subject = "Password Reset";
export default ResetPassword;
