import React from "react";
import Head from "./components/Head";
import {
  Mjml,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlText,
  MjmlTitle,
} from "mjml-react";

const MyFirstEmail = ({ name }) => {
  return (
    <Mjml>
      <Head>
        <MjmlTitle>My very first email</MjmlTitle>
      </Head>
      <MjmlBody width={500}>
        <MjmlSection>
          <MjmlColumn>
            <MjmlText fontSize={32}>Hi {name},</MjmlText>
            <MjmlText fontSize={16}>
              I'm very excited to contact you by email.
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
      </MjmlBody>
    </Mjml>
  );
};

export default MyFirstEmail;
