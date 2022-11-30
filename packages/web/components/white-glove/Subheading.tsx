import type { InferProps } from "prop-types";
import cx from "classnames";

type SubheadingProps = InferProps<HTMLDivElement> & {
  className?: string;
};

export default function Subheading({
  children,
  className,
  ...divProps
}: SubheadingProps) {
  return (
    <div
      className={cx(
        "text-2xl sm:text-3xl md:text-4xl mt-8 sm:mt-16 max-w-lg sm:max-w-3xl",
        className
      )}
      {...divProps}
    >
      {children}
    </div>
  );
}
