import React from "react";
import { MjmlButton } from "mjml-react";

type ButtonPrimaryProps = {
  link: string;
  uiText: string;
};

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ link, uiText }) => {
  return (
    <MjmlButton
      lineHeight="120%"
      fontSize={16}
      height={52}
      padding="0"
      align="left"
      href={link}
      backgroundColor="#000"
      borderRadius={2}
    >
      {uiText}
    </MjmlButton>
  );
};

export default ButtonPrimary;
