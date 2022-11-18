import { MjmlButton } from "mjml-react";

import {
  colors,
  fontSize,
  lineHeight,
  borderRadius,
  fontWeight,
} from "../theme";

type ButtonProps = { secondary?: boolean } & React.ComponentProps<
  typeof MjmlButton
>;

export default function Button({ secondary, ...props }: ButtonProps) {
  let secondaryStyles = {};
  if (secondary) {
    secondaryStyles = {
      color: colors.white,
      backgroundColor: colors.amber200,
    };
  }
  return (
    <MjmlButton
      lineHeight={lineHeight.tight}
      fontSize={fontSize.lg}
      fontWeight={fontWeight.normal}
      color={colors.white}
      innerPadding="16px 24px"
      backgroundColor={colors.amber200}
      borderRadius={borderRadius.base}
      align="left"
      {...props}
      {...secondaryStyles}
    />
  );
}
