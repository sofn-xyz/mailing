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
  bbeam: {
    title: "BBeam",
    imageUrl: "/white-glove/bbeam.png",
    sourceUrl: "https://github.com/sofn-xyz/mailing-templates/tree/main/lancey",
    demoUrl: "https://bbeam-mailing.vercel.app",
  },
  bookBook: {
    title: "BookBook",
    imageUrl: "/white-glove/bookbook.png",
    sourceUrl:
      "https://github.com/sofn-xyz/mailing-templates/tree/main/book-book",
    demoUrl: "https://book-book-mailing.vercel.app",
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
    <div className="sm:mx-4 md:mx-6 mb-16 w-full sm:w-[256px] md:w-[342px]">
      <div className="w-full">
        <div className="relative rounded-full">
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline sm:active:translate-y-1 sm:inline-block"
          >
            <Image src={imageUrl} alt={title} width={1200} height={800} />
          </a>
        </div>
      </div>
      <div className="flex mt-4 lg:mt-6 text-2xl lg:text-4xl">
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-400"
        >
          Source
        </a>
        &nbsp;&nbsp;·&nbsp;&nbsp;
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-400"
        >
          Demo
        </a>
      </div>
      {brandUrl ? (
        <a
          href={brandUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-blue-400 block text-lg md:text-xl lg:text-2xl mt-1"
        >
          {title}
        </a>
      ) : (
        <div className="text-gray-300 text-lg md:text-xl lg:text-2xl mt-1">
          {title}
        </div>
      )}
    </div>
  );
}

export default ExampleCard;
