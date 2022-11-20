import Link from "next/link";
import LogoMarkSmall from "./icons/LogoMarkSmall";

const Watermark: React.FC = () => {
  return (
    <div className="pt-8 pb-12 flex justify-center mx-auto">
      <Link href="https://www.mailing.run" legacyBehavior>
        <a
          className="flex flex-col items-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LogoMarkSmall height={13} width={16} />
          <div className="text-white text-[10px] pt-2 leading-none">
            Powered by Mailing
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Watermark;
