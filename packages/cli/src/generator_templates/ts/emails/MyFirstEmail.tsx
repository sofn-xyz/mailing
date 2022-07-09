import React from "react";
import Head from "./components/Head";
import {
  Mjml,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlText,
  MjmlTitle,
  MjmlImage,
  MjmlButton,
} from "mjml-react";

const MyFirstEmail: React.FC<{ name: string }> = ({ name }) => {
  return (
    <Mjml>
      <Head>
        <MjmlTitle>Welcome to Mailing</MjmlTitle>
      </Head>
      <MjmlBody width={600}>
        <MjmlSection padding="48px 0 40px">
          <MjmlColumn>
            <MjmlImage
              padding="0 24px 0"
              width="146"
              height="32"
              align="left"
              src="https://s3.amazonaws.com/lab.campsh.com/mailing-logo%402x.png"
            />
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection padding="0">
          <MjmlColumn>
            <MjmlImage
              cssClass="hero"
              padding="0 0 40px"
              width="600"
              height="338"
              align="left"
              src="https://s3.amazonaws.com/lab.campsh.com/welcome%402x.jpg"
            />
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection padding="0 24px 0" cssClass="smooth">
          <MjmlColumn>
            <MjmlText padding="0" fontSize={30} lineHeight="120%">
              Welcome to Mailing
            </MjmlText>
            <MjmlText padding="24px 0 16px" fontSize={16} lineHeight="160%">
              Hello, {name}. Mailing makes it easy to send great emails from
              your React app. Here’s a bit about Mailing in a nutshell:
            </MjmlText>
            <MjmlText
              padding="1px 0 0"
              fontSize={16}
              lineHeight="160%"
              cssClass="li"
            >
              •&nbsp;&nbsp;Email templates with React components
            </MjmlText>
            <MjmlText
              padding="1px 0 0"
              fontSize={16}
              lineHeight="160%"
              cssClass="li"
            >
              •&nbsp;&nbsp;MJML components that work across clients (Outlook!)
            </MjmlText>
            <MjmlText
              padding="1px 0 0"
              fontSize={16}
              lineHeight="160%"
              cssClass="li"
            >
              •&nbsp;&nbsp;Preview server for quick development
            </MjmlText>
            <MjmlText
              padding="1px 0 0"
              fontSize={16}
              lineHeight="160%"
              cssClass="li"
            >
              •&nbsp;&nbsp;Test mode for ensuring emails send and have the
              correct content
            </MjmlText>
            <MjmlText
              padding="1px 0 0"
              fontSize={16}
              lineHeight="160%"
              cssClass="li"
            >
              •&nbsp;&nbsp;Plays well with js frameworks like redwood.js, remix,
              next.js
            </MjmlText>
            <MjmlText
              padding="1px 0 0"
              fontSize={16}
              lineHeight="160%"
              cssClass="li"
            >
              •&nbsp;&nbsp;Written in Typescript
            </MjmlText>
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
            <MjmlText padding="16px 0 96px" fontSize={16} lineHeight="160%">
              ♥,
              <br />
              Mailing
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection cssClass="smooth">
          <MjmlColumn>
            <MjmlText
              cssClass="footer"
              padding="0 24px 48px"
              fontSize={14}
              color="#777"
            >
              © 2022 Mailing&nbsp;&nbsp;·&nbsp;&nbsp;
              <a href="#" target="_blank">
                Unsubscribe
              </a>
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
      </MjmlBody>
    </Mjml>
  );
};

export default MyFirstEmail;
