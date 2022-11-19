// A tiny loader written in the classical style.
const CircleLoader: React.FC = () => {
  return (
    <div className="content-loader w-[20px] h-[20px]">
      <svg
        className="loader animate-spin relative left-[5px] top-[5px] mt-[5px]"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <circle id="path-1" cx="5" cy="5" r="5"></circle>
          <mask
            id="mask-2"
            maskContentUnits="userSpaceOnUse"
            maskUnits="objectBoundingBox"
            x="0"
            y="0"
            width="10"
            height="10"
            className="fill-black dark:fill-white"
          >
            <use xlinkHref="#path-1"></use>
          </mask>
        </defs>
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="circle">
            <path
              d="M5,0 C2.23857625,0 0,2.23857625 0,5 C0,7.76142375 2.23857625,10 5,10 L5,10"
              id="Oval"
              className="fill-black dark:fill-white"
            ></path>
            <use
              className="stroke-black dark:stroke-white"
              id="Oval-Copy"
              mask="url(#mask-2)"
              strokeWidth="2"
              xlinkHref="#path-1"
            ></use>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default CircleLoader;
