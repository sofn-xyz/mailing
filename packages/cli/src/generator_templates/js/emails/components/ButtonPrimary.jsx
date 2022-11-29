import { MjmlButton } from "mjml-react";
import { colors, fontSize, borderRadius, lineHeight } from "../theme";

const ButtonPrimary = ({ link, uiText }) => {
  return (
    <>
      <MjmlButton
        lineHeight={lineHeight.tight}
        fontSize={fontSize.base}
        height={32}
        padding="0"
        align="left"
        href={link}
        backgroundColor={colors.black}
        color={colors.grayLight}
        borderRadius={borderRadius.base}
        cssClass="light-mode"
      >
        {uiText}
      </MjmlButton>
      <MjmlButton
        lineHeight={lineHeight.tight}
        fontSize={fontSize.base}
        height={32}
        padding="0"
        align="left"
        href={link}
        backgroundColor={colors.gold}
        color={colors.black}
        borderRadius={borderRadius.base}
        cssClass="dark-mode"
      >
        {uiText}
      </MjmlButton>
    </>
  );
};
export default ButtonPrimary;
