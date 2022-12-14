import React from "react";
import { MjmlDivider } from "mjml-react";
import { colors } from "../theme";

const defaultProps = {
  borderColor: colors.neutral600,
  borderStyle: "dotted",
  borderWidth: "1px",
};
export default function Divider(props) {
  return <MjmlDivider {...defaultProps} {...props} />;
}
