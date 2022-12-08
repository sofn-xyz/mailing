import Image from "next/image";
import { Arrow } from "./Arrow";
import Link from "next/link";

const DATA = {
  cymen: {
    imageUrl: "/homepage/testimonial-cv@2x.png",
    fullName: "Cymen Vig",
    sourceUrl:
      "https://github.com/sofn-xyz/mailing/issues/89#issuecomment-1206689044",
    sourceText: "View on Github",
    quote: (
      <>
        Really happy to find mailing – thank you for sharing it. I was already
        using MJML but it didn’t fit well in my workflow. I’m excited to be able
        to use all of that and have the excellent preview capabilities of
        mailing!
      </>
    ),
  },
  will: {
    imageUrl: "/homepage/testimonial-wv@2x.png",
    fullName: "Will Viles",
    sourceUrl:
      "https://github.com/sofn-xyz/mailing/issues/163#issuecomment-1241643724",
    sourceText: "View on Github",
    quote: (
      <>
        Wow, you guys are fast! Thank you{" "}
        <a
          href="http://github.com/alexfarrill"
          rel="noopener noreferrer"
          className="text-blue-400 inline-block hover:underline"
        >
          @alexfarrill
        </a>{" "}
        <a
          href="http://github.com/psugihara"
          rel="noopener noreferrer"
          className="text-blue-400 inline-block hover:underline"
        >
          @psugihara
        </a>{" "}
        for such a speedy fix 👍
      </>
    ),
  },
  johan: {
    imageUrl: "/homepage/testimonial-email@2x.png",
    fullName: "Johan",
    quote: (
      <>
        Again, thanks for the beautiful development experience mailing brings.
      </>
    ),
  },
  guillermo: {
    imageUrl: "/homepage/testimonial-gr@2x.jpeg",
    fullName: "Guillermo Rauch",
    sourceUrl: "https://twitter.com/rauchg/status/1556013344082894848",
    sourceText: "View on Twitter",
    quote: (
      <>
        This is sublime. Action Mailer-inspired,{" "}
        <a
          href="https://twitter.com/nextjs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 inline-block hover:underline"
        >
          @nextjs
        </a>{" "}
        compatible email system. Send emails built with{" "}
        <a
          href="https://twitter.com/reactjs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 inline-block hover:underline"
        >
          @reactjs
        </a>{" "}
        components. <br />
        <br />
        <Link href="/" className="text-blue-400 inline-block hover:underline">
          mailing.run
        </Link>
      </>
    ),
  },
  steven: {
    imageUrl: "/homepage/testimonial-st@2x.png",
    fullName: "Steven Tey",
    sourceUrl: "https://twitter.com/steventey/status/1579471673325408257",
    sourceText: "View on Twitter",
    quote: (
      <>
        Spent the weekend creating some transactional emails for{" "}
        <a
          href="https://twitter.com/dubdotsh"
          rel="noopener noreferrer"
          target="_blank"
          className="text-blue-400 inline-block hover:underline"
        >
          @dubdotsh
        </a>{" "}
        with{" "}
        <Link href="/" className="text-blue-400 inline-block hover:underline">
          mailing.run
        </Link>{" "}
        – it’s a gamechanger 🤯
        <br />
        <br />✅ Develop & preview emails with{" "}
        <a
          href="https://twitter.com/nextjs"
          rel="noopener noreferrer"
          target="_blank"
          className="text-blue-400 inline-block hover:underline"
        >
          @nextjs’
        </a>
        fast refresh
        <br />✅ Intercept emails & show a preview in localhost
        <br />✅ One-click deploy your email previews to{" "}
        <a
          href="https://twitter.com/vercel"
          rel="noopener noreferrer"
          target="_blank"
          className="text-blue-400 inline-block hover:underline"
        >
          @vercel
        </a>
      </>
    ),
  },
  sidi: {
    imageUrl: "/homepage/testimonial-sd@2x.png",
    fullName: "Sidi Dev",
    sourceUrl: "https://twitter.com/sidi_jeddou_dev/status/1579928272347230208",
    sourceText: "View on Twitter",
    quote: (
      <>
        After I checked out{" "}
        <Link href="/" className="text-blue-400 inline-block hover:underline">
          mailing.run
        </Link>{" "}
        I liked it so much, and the best thing is how to deploy it on vercel, I
        decided to use it to build a newsletter script for{" "}
        <a
          href="https://twitter.com/float_ui"
          rel="noopener noreferrer"
          target="_blank"
          className="text-blue-400 inline-block hover:underline"
        >
          @float_ui
        </a>{" "}
        😍
      </>
    ),
  },
};

type SocialProps = {
  name: keyof typeof DATA;
};

export function Social({ name }: SocialProps) {
  const data = DATA[name];
  if (!data) return null;
  const { imageUrl, fullName, quote } = data;
  const sourceUrl = data["sourceUrl"];
  const sourceText = data["sourceText"];

  return (
    <div className="max-w-full lg:max-w-[45%] mt-16 sm:mt-[72px] md:mt-[84px] lg:mt-[120px] xl:mt-36 ">
      <Image
        width="64"
        height="64"
        src={imageUrl}
        alt={fullName}
        className="rounded-full"
      />
      <h3 className="mt-3 font-serif font-bold text-4xl sm:text-[44px] leading-[1.4]">
        {fullName}
      </h3>
      {sourceUrl && (
        <a
          href={sourceUrl}
          rel="noopener noreferrer"
          target="_blank"
          className="hover:text-blue inline-block mt-1 leading-[1.15]"
        >
          <span className="underline">{sourceText}</span> <Arrow />
        </a>
      )}
      <div className="text-lg lg:text-xl mt-6 sm:mt-[30px]">{quote}</div>
    </div>
  );
}

export default Social;
