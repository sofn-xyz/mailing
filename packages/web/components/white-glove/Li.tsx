import type { ReactNode } from "react";
import cx from "classnames";

type LiProps = {
  title: string;
  description: ReactNode;
  index: number;
};

export default function Li({ title, description, index }: LiProps) {
  return (
    <div
      className={cx("flex max-w-4xl", {
        "mt-10 sm:mt-20": index > 1,
        "mt-8 sm:mt-12 md:mt-24": index === 1,
      })}
    >
      <div className="-mt-1.5 md:mt-1 text-green-200 font-serif font-bold text-[64px] lg:text-[84px] xl:text-[108px] min-w-[72px] leading-[.9] md:leading-[.6] lg:leading-[.7] xl:leading-[.6]">
        {index}
      </div>
      <div className="-ml-2 sm:ml-4 lg:ml-12 max-w-[720px]">
        <div className="text-2xl sm:text-3xl md:text-4xl">{title}</div>
        <div className="text-lg md:text-2xl mt-3 md:mt-6">{description}</div>
      </div>
    </div>
  );
}
