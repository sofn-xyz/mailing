type CircleLoaderProps = {};

const CircleLoader: React.FC<CircleLoaderProps> = ({}) => {
  return (
    <div className="content-loader">
      <img
        className="loader"
        src="http://lab.campsh.com/images/circle.svg"
        width="10"
        height="10"
      />
      <style jsx>{`
        img {
          margin: 0 auto;
        }
        div.content-loader {
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
