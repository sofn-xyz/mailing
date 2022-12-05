import React from "react";
import cx from "classnames";
import { MjmlButton } from "mjml-react";

import {
  colors,
  fontSize,
  borderRadius,
  lineHeight,
  fontWeight,
} from "../theme";

type ButtonProps = React.ComponentProps<typeof MjmlButton>;

export default function Button(props: ButtonProps) {
  return (
    <>
      <MjmlButton
        lineHeight={lineHeight.tight}
        fontSize={fontSize.base}
        fontWeight={fontWeight.bold}
        innerPadding="16px 24px 18px"
        align="left"
        backgroundColor={colors.blue}
        color={colors.black}
        borderRadius={borderRadius.base}
        cssClass={cx("button", props.cssClass)}
        {...props}
      />
    </>
  );
}
