import React from "react";
import { MjmlButton } from "mjml-react";

import { colors, fontSize, borderRadius, lineHeight, spacing } from "../theme";

type ButtonProps = React.ComponentProps<typeof MjmlButton>;

export default function Button(props: ButtonProps) {
  return (
    <>
      <MjmlButton
        lineHeight={lineHeight.tight}
        fontSize={fontSize.base}
        height={spacing.s8}
        align="left"
        backgroundColor={colors.black}
        color={colors.neutral100}
        borderRadius={borderRadius.base}
        cssClass="light-mode"
        {...props}
      />
      <MjmlButton
        lineHeight={lineHeight.tight}
        fontSize={fontSize.base}
        height={spacing.s8}
        align="left"
        backgroundColor={colors.gold}
        color={colors.black}
        borderRadius={borderRadius.base}
        cssClass="dark-mode"
        {...props}
      />
    </>
  );
}
