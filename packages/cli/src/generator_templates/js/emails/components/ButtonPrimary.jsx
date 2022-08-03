import { MjmlButton } from "mjml-react";
import { black } from "./theme";
import { leadingTight, textBase, borderBase } from "./theme";

const ButtonPrimary = ({ link, uiText }) => {
  return (
    <MjmlButton
      lineHeight={leadingTight}
      fontSize={textBase}
      height={52}
      padding="0"
      align="left"
      href={link}
      backgroundColor={black}
      borderRadius={borderBase}
    >
      {uiText}
    </MjmlButton>
  );
};

export default ButtonPrimary;
