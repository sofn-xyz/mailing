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
  MjmlButton,
} from "mjml-react";
import BulletedList from "./components/BulletedList";

const MyFirstEmail: React.FC<{ name: string }> = ({ name }) => {
  return (
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
            <MjmlText padding="0" fontSize={30} lineHeight="120%">
              Welcome, {name}!
            </MjmlText>
            <MjmlText padding="24px 0 16px" fontSize={16} lineHeight="160%">
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
            <MjmlButton
              lineHeight="120%"
              fontSize={16}
              width={196}
              height={52}
              padding="24px 0"
              align="left"
              href="https://github.com/psugihara/mailing"
              backgroundColor="#000"
              borderRadius={2}
            >
              View GitHub Repo
            </MjmlButton>
            <MjmlText padding="0" fontSize={16} lineHeight="160%">
              Thank you for checking out our project. We’d love to hear your
              ideas on how we can make sending great emails more fun and simple.
            </MjmlText>
            <MjmlText padding="16px 0 0" fontSize={16} lineHeight="160%">
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
};

export default MyFirstEmail;
