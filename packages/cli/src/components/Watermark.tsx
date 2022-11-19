import LogoMarkSmall from "./icons/LogoMarkSmall";

const Watermark: React.FC = () => {
  return (
    <div className="pt-8 pb-12 text-center left-0 right-0 bottom-0 absolute mx-auto">
      <LogoMarkSmall />
      <p className="text-white text-[10px] pt-2 leading-none">
        Powered by Mailing
      </p>
    </div>
  );
};

export default Watermark;
