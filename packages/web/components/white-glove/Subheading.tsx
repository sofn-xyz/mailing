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
        "subhead text-2xl sm:text-3xl md:text-4xl mt-8 sm:mt-16 max-w-lg sm:max-w-3xl",
        className
      )}
      {...divProps}
    >
      {children}
      <style jsx>{`
        .subhead {
          line-height: 120%;
        }
        @media (max-width: 640px) {
          .subhead {
            line-height: 140%;
          }
        }
      `}</style>
    </div>
  );
}
