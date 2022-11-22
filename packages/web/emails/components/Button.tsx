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
      fontSize={fontSize.sm}
      fontWeight={fontWeight.bold}
      color={colors.black}
      innerPadding="16px 24px"
      backgroundColor={colors.white}
      borderRadius={borderRadius.base}
      align="left"
      {...props}
      {...secondaryStyles}
    />
  );
}
