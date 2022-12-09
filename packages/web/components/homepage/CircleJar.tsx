import cx from "classnames";
import Image from "next/image";

const DATA = [
  { src: "/homepage/circle-jar/HowItWorksJar1.svg", title: "Mailing" },
  { src: "/homepage/circle-jar/HowItWorksJar2.svg", title: "Your app" },
  { src: "/homepage/circle-jar/HowItWorksJar3.svg", title: "SMTP Provider" },
];

type CircleJarProps = {
  index: number;
};

export default function CircleJar({ index }: CircleJarProps) {
  const data = DATA[index];
  if (!data) return null;
  const { src, title } = data;
  return (
    <div
      className={cx(
        "border-emerald-700 -ml-5 md:-ml-4 lg:ml-0 hidden sm:block",
        {
          "min-h-full pb-20 sm:pb-32 border-l-[3px]": index < DATA.length - 1,
          "last-one border-l-0 sm:border-l-[3px]": index === DATA.length - 1,
        }
      )}
    >
      <div className="text-center relative -left-1/2">
        <Image
          className="mb-5 mx-auto"
          src={src}
          width={108}
          height={108}
          alt=""
        />
        <span className="bg-emerald-700 text-black rounded-2xl px-4 pt-2 pb-3 hidden sm:block leading-none sm:w-[96px] mx-auto">
          {title}
        </span>
      </div>
    </div>
  );
}
