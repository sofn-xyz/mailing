import Image from "next/image";

const Watermark: React.FC = () => {
  return (
    <div className="pt-8 pb-12 text-center left-0 right-0 bottom-0 absolute mx-auto">
      <Image
        src="/logo-mark-small.svg"
        width="12.8"
        height="16"
        alt="Mailing icon"
      />
      <p className="text-white text-[10px] pt-2 leading-none">
        Powered by Mailing
      </p>
    </div>
  );
};

export default Watermark;
