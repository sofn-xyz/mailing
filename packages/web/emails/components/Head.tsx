import React, { ReactElement } from "react";
import {
  MjmlHead,
  MjmlFont,
  MjmlAttributes,
  MjmlAll,
  MjmlStyle,
} from "mjml-react";

type HeadProps = { children?: ReactElement };

const Head: React.FC<HeadProps> = ({ children }) => {
  return (
    <MjmlHead>
      <MjmlFont
        name="Inter"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900"
      />
      <MjmlStyle>{`
        .smooth {
          -webkit-font-smoothing: antialiased;
        }
        .paragraph a {
          color: #000 !important;
        }
        .li {
          text-indent: -18px;
          margin-left: 24px;
          display: inline-block;
        }
        .footer a {
          text-decoration: none !important;
          color: #777 !important;
        }
        @media (min-width:480px) {
          td.hero {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
        }
      `}</MjmlStyle>
      <MjmlAttributes>
        <MjmlAll
          font-family='Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          font-weight="400"
        />
      </MjmlAttributes>
      {children}
    </MjmlHead>
  );
};

export default Head;
