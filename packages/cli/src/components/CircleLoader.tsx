import Image from "next/image";

// A tiny loader written in the classical style.
const CircleLoader: React.FC = () => {
  return (
    <div className="content-loader">
      <Image
        className="loader"
        src="/circle-loader.svg"
        width="10"
        height="10"
        alt="live reloading"
      />
      <style jsx>{`
        img {
          position: relative;
          left: 5px;
          top: 5px;
        }
        div.content-loader {
          background: black;
          width: 20px;
          height: 20px;
        }
        .loader {
          animation: rotate 2s infinite;
          margin-top: 5px;
        }
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(90deg);
          }
          50% {
            transform: rotate(180deg);
          }
          75% {
            transform: rotate(270deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default CircleLoader;
