import type { ReactNode } from "react";

type LiProps = {
  title: string;
  description: ReactNode;
  index: number;
};

export default function Li({ title, description, index }: LiProps) {
  return (
    <div className="flex max-w-4xl  mt-16 sm:mt-20">
      <div className="text-green-200 font-serif font-bold text-[64px] lg:text-[84px] xl:text-[108px] min-w-[72px] leading-[.9] md:leading-[.6] lg:leading-[.7] xl:leading-[.6]">
        {index}
      </div>
      <div className="ml-6 sm:ml-16">
        <div className="text-2xl sm:text-3xl md:text-4xl">{title}</div>
        <div className="text-lg md:text-2xl mt-3 md:mt-6">{description}</div>
      </div>
    </div>
  );
}
