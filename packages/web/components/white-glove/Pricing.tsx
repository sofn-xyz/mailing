import cx from "classnames";

function Td(props: { children: React.ReactNode; className?: string }) {
  return (
    <td className={cx("text-center py-8", props.className)}>
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
            <th className="text-left"># of templates</th>
            <th className="text-center">Private templates</th>
            <th className="text-center rounded-t-2xl border-x-4 border-t-4 border-green-200 py-8">
              Open source templates{" "}
              <span className="text-green-300 font-bold font-serif">*</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bb-dotted py-8">
            <Td>1-5</Td>
            <Td>$500 each</Td>
            <Td className="border-x-4 border-green-200">$250 each</Td>
          </tr>
          <tr className="bb-dotted py-8">
            <Td>6-10</Td>
            <Td>$450 each</Td>
            <Td className="border-x-4 border-green-200">$225 each</Td>
          </tr>
          <tr className="bb-dotted py-8">
            <Td>11-15</Td>
            <Td>$400 each</Td>
            <Td className="border-x-4 border-green-200">$200 each</Td>
          </tr>
          <tr className="py-8">
            <Td>16+</Td>
            <Td>$350 each</Td>
            <Td className="rounded-b-2xl border-x-4 border-b-4 border-green-200">
              $175 each
            </Td>
          </tr>
        </tbody>
      </table>
      <div className="discount-gradient mt-12 flex flex-row sm:flex-col md:flex-row justify-evenly items-center py-12 bg-green-200 text-black rounded-2xl sm:mt-12 w-full">
        <div className="font-bold font-serif mx-6 my-2.5 whitespace-nowrap text-5xl lg:text-6xl xl:text-[84px]">
          *Get a discount
        </div>
        <div className="text-center mx-4 text-lg sm:text-xl md:text-2xl max-w-sm">
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
