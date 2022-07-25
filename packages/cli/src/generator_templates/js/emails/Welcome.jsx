import React from "react";
import Head from "./components/Head";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  Mjml,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlText,
  MjmlImage,
  MjmlSpacer,
} from "mjml-react";
import BulletedList from "./components/BulletedList";
import ButtonPrimary from "./components/ButtonPrimary";
import {
  leadingTight,
  leadingRelaxed,
  textBase,
  textXl,
} from "./components/theme";

const MyFirstEmail = ({ name }) => (
  <Mjml>
    <Head />
    <MjmlBody width={600}>
      <Header big />
      <MjmlSection padding="0">
        <MjmlColumn>
          <MjmlImage
            cssClass="hero"
            padding="0 0 40px"
            align="left"
            src="https://s3.amazonaws.com/lab.campsh.com/welcome%402x.jpg"
          />
        </MjmlColumn>
      </MjmlSection>
      <MjmlSection padding="0 24px 0" cssClass="smooth">
        <MjmlColumn>
          <MjmlText padding="0" fontSize={textXl} lineHeight={leadingTight}>
            Welcome, {name}!
          </MjmlText>
          <MjmlText
            padding="24px 0 16px"
            fontSize={textBase}
            lineHeight={leadingRelaxed}
          >
            Mailing makes it easy to send great emails from your React app.
            Here’s a bit about Mailing in a nutshell:
          </MjmlText>
          <BulletedList
            items={[
              "Email templates with React components",
              "MJML components that work across clients (Outlook!)",
              "Preview server for quick development",
              "Dev mode opens emails in your browser instead of sending",
              "Test mode for ensuring emails send and have the correct content",
              "Plays well with js frameworks like redwood.js, remix, next.js",
              "Written in Typescript, inspired by Action Mailer from Ruby on Rails",
            ]}
          />
          <MjmlSpacer height="24px" />
          <ButtonPrimary
            link={"https://github.com/successor-software/mailing"}
            uiText={"View Github Repo"}
          />
          <MjmlSpacer height="24px" />
          <MjmlText padding="0" fontSize={textBase} lineHeight={leadingRelaxed}>
            Thank you for checking out our project. We’d love to hear your ideas
            on how we can make sending great emails more fun and simple.
          </MjmlText>
          <MjmlText
            padding="16px 0 0"
            fontSize={textBase}
            lineHeight={leadingRelaxed}
          >
            ♥,
            <br />
            Mailing
          </MjmlText>
        </MjmlColumn>
      </MjmlSection>
      <Footer />
    </MjmlBody>
  </Mjml>
);

export default MyFirstEmail;
