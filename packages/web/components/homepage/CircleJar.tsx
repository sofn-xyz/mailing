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
      className={cx("border-emerald-700", {
        "min-h-full pb-20 sm:pb-30 border-l-2": index < DATA.length - 1,
        "last-one border-l-0 sm:border-l-2": index === DATA.length - 1,
      })}
    >
      <div className="text-center relative -left-1/2">
        <Image
          className="mb-5 mx-auto"
          src={src}
          width={108}
          height={108}
          alt=""
        />
        <span className="bg-emerald-700 text-black rounded-2xl px-4 pt-2 pb-2.5 hidden sm:block">
          {title}
        </span>
      </div>
    </div>
  );
}
