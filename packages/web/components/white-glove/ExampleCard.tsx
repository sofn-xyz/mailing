import Image from "next/image";

const EXAMPLES = {
  fynn: {
    title: "Fynn",
    imageUrl: "/white-glove/fynn.png",
    brandUrl: "http://fynncredit.com",
    sourceUrl: "https://github.com/sofn-xyz/mailing-templates/tree/main/fynn",
    demoUrl: "https://fynn-mailing.vercel.app",
  },
  thoughtfulPost: {
    title: "Thoughtful Post",
    imageUrl: "/white-glove/thoughtful-post.png",
    brandUrl: "https://thoughtfulpost.com",
    sourceUrl:
      "https://github.com/sofn-xyz/mailing-templates/tree/main/thoughtful-post",
    demoUrl: "https://thoughtful-post-mailing.vercel.app",
  },
  lancey: {
    title: "Lancey",
    imageUrl: "/white-glove/lancey.png",
    brandUrl: "https://lancey.com",
    sourceUrl: "https://github.com/sofn-xyz/mailing-templates/tree/main/lancey",
    demoUrl: "https://lancey-mailing.vercel.app",
  },
  mailing: {
    title: "Mailing",
    imageUrl: "/white-glove/mailing.png",
    brandUrl: "https://www.mailing.run",
    sourceUrl:
      "https://github.com/sofn-xyz/mailing/tree/main/packages/web/emails",
    demoUrl: "https://emails.mailing.run",
  },
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
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            <Image
              src={imageUrl}
              alt={title}
              width={1200}
              height={800}
              layout="responsive"
            />
          </a>
        </div>
      </div>
      <div className="flex mt-4 text-2xl sm:text-3xl md:text-4xl">
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-green-300 transition-colors"
        >
          Source
        </a>
        &nbsp;&nbsp;·&nbsp;&nbsp;
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-green-300 transition-colors"
        >
          Demo
        </a>
      </div>
      <a
        href={brandUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-green-300 block text-lg sm:text-2xl mt-1"
      >
        {title}
      </a>
    </div>
  );
}

export default ExampleCard;
