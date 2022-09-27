import Image from "next/image";

// A tiny loader written in the classical style.
const CircleLoader: React.FC = () => {
  return (
    <div className="content-loader w-[20px] h-[20px]">
      <Image
        className="loader animate-spin relative left-[5px] top-[5px] mt-[5px]"
        src="/circle-loader.svg"
        width="10"
        height="10"
        alt="live reloading"
      />
    </div>
  );
};

export default CircleLoader;
