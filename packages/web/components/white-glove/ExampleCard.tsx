import Image from "next/image";

const EXAMPLES = {
  fynn: {
    title: "Fynn",
    imageUrl: "/white-glove/fynn.png",
    brandUrl: "http://fynncredit.com",
    sourceUrl: "",
    demoUrl: "https://fynn-mailing.vercel.app",
  },
  thoughtfulPost: {
    title: "Thoughtful Post",
    imageUrl: "/white-glove/thoughtful-post.png",
    brandUrl: "https://thoughtfulpost.com",
    sourceUrl: "",
    demoUrl: "https://thoughtful-post-mailing.vercel.app",
  },
  //   - ThoughtfulPost [Demo](https://thoughtful-post-mailing.vercel.app/) / [Source](https://github.com/sofn-xyz/mailing-templates/tree/main/thoughtful-post)
  // - Lancey [Demo](https://lancey-mailing.vercel.app/) / [Source](https://github.com/sofn-xyz/mailing-templates/tree/main/lancey)
  // - Fynn [Demo](https://fynn-mailing.vercel.app/) / [Source](https://github.com/sofn-xyz/mailing-templates/tree/main/fynn)
};

type ExampleCardProps = {
  name: keyof typeof EXAMPLES;
};

export function ExampleCard({ name }: ExampleCardProps) {
  const example = EXAMPLES[name];
  if (!example) return null;
  const { title, imageUrl, brandUrl, sourceUrl, demoUrl } = example;
  return (
    <div className="sm:mx-6 mb-16 w-full sm:w-[342px]">
      <div className="w-full">
        <div className="relative rounded-full">
          <Image
            src={imageUrl}
            alt={title}
            width={1200}
            height={800}
            layout="responsive"
          />
        </div>
      </div>
      <div className="flex mt-4 text-4xl">
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Source
        </a>
        &nbsp;&nbsp;·&nbsp;&nbsp;
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Demo
        </a>
      </div>
      <a
        href={brandUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 block text-2xl mt-1"
      >
        {title}
      </a>
    </div>
  );
}

export default ExampleCard;
