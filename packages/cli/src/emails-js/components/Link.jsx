import React from "react";
import { colors } from "../theme";

const getHrefPropsFromProps = (props) => {
  return JSON.parse(
    JSON.stringify({
      href: props.href,
      rel: props.rel,
      target: props.target,
    })
  );
};
const getStylePropsFromProps = (props) => {
  return JSON.parse(
    JSON.stringify({
      color: props.color,
      fontFamily: props.fontFamily,
      fontSize: props.fontSize,
      fontStyle: props.fontStyle,
      fontWeight: props.fontWeight,
      letterSpacing: props.letterSpacing,
      height: props.height,
      textDecoration: props.textDecoration,
      textTransform: props.textTransform,
      align: props.align,
    })
  );
};
export default function Link({ children, ...props }) {
  return (
    <a
      target="_blank"
      rel="noopener"
      {...getHrefPropsFromProps(props)}
      style={{
        color: colors.blue400,
        ...getStylePropsFromProps(props),
      }}
    >
      {children}
    </a>
  );
}
