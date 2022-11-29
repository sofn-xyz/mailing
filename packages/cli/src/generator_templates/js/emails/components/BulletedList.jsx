import { MjmlText } from "mjml-react";
import { fontSize, lineHeight } from "../theme";

const BulletedList = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <MjmlText
          padding="1px 0 0"
          fontSize={fontSize.base}
          lineHeight={lineHeight.relaxed}
          cssClass="li"
          key={item}
        >
          •&nbsp;&nbsp;{item}
        </MjmlText>
      ))}
    </>
  );
};
export default BulletedList;
