import React from "react";
import Text from "./Text";
import { fontFamily, lineHeight, fontWeight, fontSize } from "../theme";

const defaultProps = {
  fontFamily: fontFamily.sans,
  fontWeight: fontWeight.normal,
  lineHeight: lineHeight.tight,
  fontSize: fontSize.xl,
};
export default function Heading(props) {
  return (
    <Text {...defaultProps} {...props}>
      {props.children}
    </Text>
  );
}
