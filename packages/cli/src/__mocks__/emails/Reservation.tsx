import React, { ReactElement } from "react";
import { MjmlSection, MjmlColumn } from "mjml-react";
import { Template } from "mailing-core";

import Header from "./components/Header";
import Heading from "./components/Heading";
import Footer from "./components/Footer";
import Button from "./components/Button";
import Text from "./components/Text";
import BaseLayout from "./components/BaseLayout";
import Divider from "./components/Divider";
import { spacing } from "./theme";

type ReservationProps = {
  headline: string;
  body: ReactElement;
  bulletedList: ReactElement;
  ctaText?: string;
};

const Reservation: Template<ReservationProps> = ({
  headline,
  body,
  bulletedList,
  ctaText,
}) => {
  return (
    <BaseLayout width={352}>
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
    </BaseLayout>
  );
};
Reservation.subject = ({ headline }) => headline || "Your BookBook Reservation";
export default Reservation;
