import Text from "./Text";
import { fontFamily, lineHeight, fontWeight } from "../theme";

type HeadingProps = {
  lg?: Partial<React.ComponentProps<typeof Text>>;
  sm?: Partial<React.ComponentProps<typeof Text>>;
} & React.ComponentProps<typeof Text>;

export default function Heading({ lg, sm, ...props }: HeadingProps) {
  const defaultProps = {
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
  };

  return (
    <>
      <Text {...defaultProps} {...props} {...lg} cssClass="lg-hidden">
        {props.children}
      </Text>
      <Text {...defaultProps} {...props} {...sm} cssClass="sm-hidden">
        {props.children}
      </Text>
    </>
  );
}
