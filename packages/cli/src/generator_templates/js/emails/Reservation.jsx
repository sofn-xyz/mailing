import React from "react";
import { MjmlSection, MjmlColumn } from "mjml-react";
import Header from "./components/Header";
import Heading from "./components/Heading";
import Footer from "./components/Footer";
import Button from "./components/Button";
import Text from "./components/Text";
import Base from "./layouts/Base";
import Divider from "./components/Divider";
import { spacing } from "./theme";

const Reservation = ({ headline, body, bulletedList, ctaText }) => {
  return (
    <Base width={352}>
      <Header />
      <MjmlSection cssClass="gutter">
        <MjmlColumn>
          <Divider paddingTop={spacing.s3} paddingBottom={spacing.s3} />
          <Heading paddingTop={spacing.s7} paddingBottom={spacing.s7}>
            {headline}
          </Heading>
          {bulletedList}
          <Text paddingTop={spacing.s5} paddingBottom={spacing.s7}>
            <>{body}</>
          </Text>
          {ctaText && <Button href="https://www.mailing.run">{ctaText}</Button>}
          <Divider paddingTop={spacing.s9} />
        </MjmlColumn>
      </MjmlSection>
      <Footer />
    </Base>
  );
};
Reservation.subject = ({ headline }) => headline || "Your BookBook Reservation";
export default Reservation;
