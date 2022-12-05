import React from "react";
import { MjmlDivider } from "mjml-react";
import { colors } from "../theme";

type DividerProps = React.ComponentProps<typeof MjmlDivider>;

const defaultProps = {
  borderColor: colors.neutral600,
  borderStyle: "dotted",
  borderWidth: "1px",
};

export default function Divider(props: DividerProps) {
  return <MjmlDivider {...defaultProps} {...props} />;
}
