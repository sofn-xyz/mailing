import type { ReactNode } from "react";
import cx from "classnames";

type LiProps = {
  title: string;
  description: ReactNode;
  index: number;
  prepend?: ReactNode;
};

export default function Li({ title, description, index, prepend }: LiProps) {
  return (
    <div
      className={cx("flex max-w-4xl", {
        "mt-8 sm:mt-12 md:mt-24": index === 1,
      })}
    >
      {prepend}
      <div className="sm:ml-2 lg:ml-12 ">
        <div className="text-2xl md:text-3xl lg:text-4xl">
          <span className="-mt-1.5 md:mt-1 text-emerald-700 font-serif font-bold text-3xl md:text-4xl lg:text-[44px] min-w-[72px] leading-[1.2]">
            0{index}
          </span>
          &nbsp;&nbsp;
          {title}
        </div>
        <div className="text-base md:text-lg lg:text-xl mt-2.5 sm:mt-3 md:mt-4 mb-10 sm:mb-0 text-slate-300 max-w-[641px]">
          {description}
        </div>
      </div>
    </div>
  );
}
