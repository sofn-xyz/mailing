import { MjmlText } from "@faire/mjml-react";

type TextProps = {
  maxWidth?: number;
  style?: React.CSSProperties;
} & React.ComponentProps<typeof MjmlText>;

export default function Text({ children, maxWidth, ...props }: TextProps) {
  if (maxWidth) {
    return (
      <MjmlText {...props}>
        <div style={{ maxWidth }}>{children}</div>
      </MjmlText>
    );
  } else return <MjmlText {...props}>{children}</MjmlText>;
}
