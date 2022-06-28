import React from "react";
import { SendMailOptions } from "nodemailer";
import {
  Mjml,
  MjmlAll,
  MjmlAttributes,
  MjmlBody,
  MjmlColumn,
  MjmlFont,
  MjmlHead,
  MjmlRaw,
  MjmlSection,
  MjmlText,
} from "mjml-react";

export type PreviewProps = SendMailOptions;

const Preview: React.FC<PreviewProps> = ({ subject, to, html }) => (
  <Mjml>
    <MjmlHead>
      <MjmlFont
        name="Inter"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;600;900"
      />
      <MjmlAttributes>
        <MjmlAll font-family="Inter" />
      </MjmlAttributes>
    </MjmlHead>

    <MjmlBody width={500}>
      <MjmlSection>
        <MjmlColumn>
          <MjmlText fontSize={16}>Subject: {subject}</MjmlText>
          <MjmlText fontSize={16}>
            <>To: {to}</>
          </MjmlText>
        </MjmlColumn>
      </MjmlSection>
      <MjmlRaw>
        <iframe
          title="email-preview-frame"
          srcDoc={html as string}
          style={{
            marginTop: "8px",
            height: "calc(100vh - 50px)",
            width: "100vw",
            border: "0",
          }}
        />
      </MjmlRaw>
    </MjmlBody>
  </Mjml>
);

export default Preview;
