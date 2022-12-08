import React from "react";
import { MjmlSection, MjmlColumn, MjmlImage } from "mjml-react";
import { Template } from "mailing-core";
import Button from "./components/Button";
import Header from "./components/Header";
import Heading from "./components/Heading";
import Footer from "./components/Footer";
import BaseLayout from "./components/BaseLayout";
import Text from "./components/Text";
import { spacing, fontSize } from "./theme";

type AccountCreatedProps = { name: string };

const AccountCreated: Template<AccountCreatedProps> = ({ name }) => (
  <BaseLayout width={600} preview="Excited to help you enjoy great meals.">
    <Header loose />
    <MjmlSection cssClass="lg-gutter" paddingBottom={spacing.s9}>
      <MjmlColumn>
        <MjmlImage
          align="left"
          src="https://s3.amazonaws.com/lab.campsh.com/bb-hero%402x.jpg"
        />
      </MjmlColumn>
    </MjmlSection>
    <MjmlSection cssClass="gutter">
      <MjmlColumn>
        <Heading fontSize={fontSize.xl}>{name}, your table awaits.</Heading>
        <Text paddingTop={spacing.s7} paddingBottom={spacing.s7}>
          Thank you for joining BookBook! We’re excited to help you enjoy great
          meals without any begging, guessing, waiting or phone calls. Just a
          couple taps, and the table is yours.
        </Text>
        <Button href="https://www.mailing.run">Book a Reservation</Button>
        <Text paddingTop={spacing.s7}>
          Enjoy!
          <br />
          The BookBook Team
        </Text>
      </MjmlColumn>
    </MjmlSection>
    <Footer includeUnsubscribe />
  </BaseLayout>
);

AccountCreated.subject = ({ name }) => `Welcome to BookBook, ${name}!`;

export default AccountCreated;
