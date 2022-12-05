import React from "react";
import cx from "classnames";
import { MjmlText } from "mjml-react";

type TextProps = {
  maxWidth?: number;
} & React.ComponentProps<typeof MjmlText>;

export default function Text({ children, maxWidth, ...props }: TextProps) {
  if (maxWidth) {
    return (
      <MjmlText {...props} cssClass={cx("button", props.cssClass)}>
        <div style={{ maxWidth }}>{children}</div>
      </MjmlText>
    );
  } else
    return (
      <MjmlText {...props} cssClass={cx("button", props.cssClass)}>
        {children}
      </MjmlText>
    );
}
