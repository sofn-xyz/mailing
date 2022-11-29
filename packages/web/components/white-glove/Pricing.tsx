import cx from "classnames";

function TdLeft(props: { children: React.ReactNode; className?: string }) {
  return (
    <td className={cx("text-left w-4/12 py-8", props.className)}>
      {props.children}
    </td>
  );
}

function TdCenter(props: { children: React.ReactNode; className?: string }) {
  return (
    <td className={cx("text-center w-4/12 py-8", props.className)}>
      {props.children}
    </td>
  );
}

export default function Pricing() {
  return (
    <>
      <table
        className="table-auto border-separate mt-8 sm:mt-12 w-full text-lg sm:text-2xl md:text-3xl lg:text-4xl"
        cellSpacing="0"
        cellPadding="0"
      >
        <thead>
          <tr className="bb-dotted">
            <th className="font-medium text-left">
              # of
              <br />
              templates
            </th>
            <th className="font-medium text-center">
              Private
              <br />
              templates
            </th>
            <th className="font-medium text-center rounded-t-2xl border-x-2 sm:border-x-4 border-t-2 sm:border-t-4 border-green-200 py-8">
              Open source
              <br />
              templates{" "}
              <span className="text-green-300 font-bold font-serif">*</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bb-dotted py-8">
            <TdLeft>1-5</TdLeft>
            <TdCenter>$500 ea.</TdCenter>
            <TdCenter className="border-x-2 sm:border-x-4 border-green-200">
              $250 ea.
            </TdCenter>
          </tr>
          <tr className="bb-dotted py-8">
            <TdLeft>6-10</TdLeft>
            <TdCenter>$450 ea.</TdCenter>
            <TdCenter className="border-x-2 sm:border-x-4 border-green-200">
              $225 ea.
            </TdCenter>
          </tr>
          <tr className="bb-dotted py-8">
            <TdLeft>11-15</TdLeft>
            <TdCenter>$400 ea.</TdCenter>
            <TdCenter className="border-x-2 sm:border-x-4 border-green-200">
              $200 ea.
            </TdCenter>
          </tr>
          <tr className="py-8">
            <TdLeft>16+</TdLeft>
            <TdCenter>$350 ea.</TdCenter>
            <TdCenter className="rounded-b-2xl border-x-2 sm:border-x-4 border-b-2 sm:border-b-4 border-green-200">
              $175 ea.
            </TdCenter>
          </tr>
        </tbody>
      </table>
      <div className="discount-gradient mt-16 flex flex-col lg:flex-row justify-evenly items-center pt-5 pb-9 bg-green-200 text-black rounded-2xl sm:mt-12 w-full">
        <div className="font-bold font-serif mx-6 my-2.5 whitespace-nowrap text-5xl lg:text-6xl xl:text-[84px]">
          * Get a discount
        </div>
        <div className="text-center pb-1 pt-1 lg:pt-3 text-lg sm:text-xl md:text-2xl w-full max-w-xs md:max-w-sm">
          for sharing your templates open source with the Mailing community.
        </div>
      </div>
      <style jsx>{`
        // table tr td {
        //   color: pink;
        //   transform: scale(1);
        //   // box-shadow: 0px 0px 0px 5px white, 0px 0px 0px 10px white, 0px 0px 0px 15px white;">
        // }
        table tr td:last-of-type {
          color: pink;
          transform: scale(1);
          box-shadow: 8px 0px 0px -4px green, -8px 0px 0px -4px green;">
        }
        .discount-gradient {
          background: conic-gradient(from 0deg at 50% 54.21%, #C3F2BC 0deg, #DBF7D7 360deg);
        }
        
      `}</style>
    </>
  );
}
