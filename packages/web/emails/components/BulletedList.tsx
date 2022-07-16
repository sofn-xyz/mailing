import React from "react";
import { MjmlText } from "mjml-react";

type BulletedListProps = {
  items: string[];
};

const BulletedList: React.FC<BulletedListProps> = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <MjmlText
          padding="1px 0 0"
          fontSize={16}
          lineHeight="160%"
          cssClass="li"
        >
          •&nbsp;&nbsp;{item}
        </MjmlText>
      ))}
    </>
  );
};

export default BulletedList;
