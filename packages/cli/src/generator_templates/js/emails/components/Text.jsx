import React from "react";
import { MjmlText } from "mjml-react";

export default function Text({ children, maxWidth, ...props }) {
  if (maxWidth) {
    return (
      <MjmlText {...props} cssClass="text">
        <div style={{ maxWidth }}>{children}</div>
      </MjmlText>
    );
  } else
    return (
      <MjmlText {...props} cssClass="text">
        {children}
      </MjmlText>
    );
}
