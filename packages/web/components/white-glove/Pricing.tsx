import cx from "classnames";

function TdCenter(props: { children: React.ReactNode; className?: string }) {
  return (
    <td className={cx("text-center py-8", props.className)}>
      {props.children}
    </td>
  );
}

function TdLeft(props: { children: React.ReactNode; className?: string }) {
  return (
    <td className={cx("text-left py-8", props.className)}>{props.children}</td>
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
            <th className="font-medium text-center rounded-t-2xl border-x-4 border-t-4 border-green-200 py-8">
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
            <TdCenter>$500 each</TdCenter>
            <TdCenter className="border-x-4 border-green-200">
              $250 each
            </TdCenter>
          </tr>
          <tr className="bb-dotted py-8">
            <TdLeft>6-10</TdLeft>
            <TdCenter>$450 each</TdCenter>
            <TdCenter className="border-x-4 border-green-200">
              $225 each
            </TdCenter>
          </tr>
          <tr className="bb-dotted py-8">
            <TdLeft>11-15</TdLeft>
            <TdCenter>$400 each</TdCenter>
            <TdCenter className="border-x-4 border-green-200">
              $200 each
            </TdCenter>
          </tr>
          <tr className="py-8">
            <TdLeft>16+</TdLeft>
            <TdCenter>$350 each</TdCenter>
            <TdCenter className="rounded-b-2xl border-x-4 border-b-4 border-green-200">
              $175 each
            </TdCenter>
          </tr>
        </tbody>
      </table>
      <div className="discount-gradient mt-16 flex flex-row sm:flex-col md:flex-row justify-evenly items-center pt-5 pb-8 bg-green-200 text-black rounded-2xl sm:mt-12 w-full">
        <div className="font-bold font-serif mx-6 my-2.5 whitespace-nowrap text-5xl lg:text-6xl xl:text-[84px]">
          * Get a discount
        </div>
        <div className="text-center pt-3 mx-4 text-lg sm:text-xl md:text-2xl max-w-sm font-medium">
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
