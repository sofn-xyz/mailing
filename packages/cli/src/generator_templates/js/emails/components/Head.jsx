import React from "react";
import { MjmlHead, MjmlFont, MjmlAttributes, MjmlAll } from "mjml-react";

const Head = ({ children }) => {
  return (
    <MjmlHead>
      <MjmlFont
        name="Inter"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;600;900"
      />
      <MjmlAttributes>
        <MjmlAll font-family="Inter" />
      </MjmlAttributes>
      {children}
    </MjmlHead>
  );
};

export default Head;
