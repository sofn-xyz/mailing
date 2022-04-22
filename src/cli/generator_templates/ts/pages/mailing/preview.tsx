import React from "react";
import { GetServerSideProps } from "next";
import { renderToString } from "util/email";

const fs = require("fs").promises;

type PreviewPropTypes = {
  to: string;
  subject: string;
  emailHTML: string;
};

export default function Preview({ subject, to, emailHTML }: PreviewPropTypes) {
  return (
    <div>
      <div>Subject: {subject}</div>
      <div>To: {to}</div>
      <iframe title="email-preview-frame" srcDoc={emailHTML} />
      <style jsx>{`
        iframe {
          margin-top: 8px;
          height: calc(100vh - 50px);
          width: 100vw;
        }
      `}</style>
    </div>
  );
}

// Emails can only be rendered on the server, so we just pass html to the client
// for the preview.
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (process.env.NODE_ENV !== "development") {
    throw new Error("Mailer previews available in development");
  }
  const { path, componentName } = query;
  const decodedPath = Buffer.from(path as string, "base64").toString("ascii");
  const data = JSON.parse(await fs.readFile(decodedPath));
  const { props, subject, to } = data;
  const emailHTML = renderToString(props, componentName as string);
  return { props: { emailHTML, subject, to } };
};
