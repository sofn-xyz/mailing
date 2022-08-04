import { MjmlButton } from "mjml-react";
import { black, grayLight } from "./theme";
import { leadingTight, textBase, borderBase } from "./theme";

const ButtonPrimary = ({ link, uiText }) => {
  return (
    <>
      <MjmlButton
        lineHeight={leadingTight}
        fontSize={textBase}
        height={52}
        padding="0"
        align="left"
        href={link}
        backgroundColor={black}
        borderRadius={borderBase}
        cssClass="light-mode"
      >
        {uiText}
      </MjmlButton>
      <MjmlButton
        lineHeight={leadingTight}
        fontSize={textBase}
        height={52}
        padding="0"
        align="left"
        href={link}
        backgroundColor={grayLight}
        color={black}
        borderRadius={borderBase}
        cssClass="dark-mode"
      >
        {uiText}
      </MjmlButton>
    </>
  );
};

export default ButtonPrimary;
