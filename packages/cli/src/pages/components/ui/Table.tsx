import { ReactElement } from "react";
import cx from "classnames";

type TableProps = {
  rows: (string | ReactElement)[][];
};

const Table: React.FC<TableProps> = ({ rows }) => {
  // make sure all rows have 3 columns (we can make it more flexible later)
  const numColumns = 3;
  if (rows.find((row) => row.length !== numColumns)) {
    throw new Error("All rows must have the same number of columns");
  }

  return (
    <div className="grid grid-cols-3 border-t border-neutral-600 text-sm">
      {rows[0].map((header, i) => (
        <div
          key={`header:${i}`}
          className="border-b border-gray-500 border-dotted col-span-1 pb-2 pt-3 uppercase text-slate-400 text-xs font-bold"
        >
          {header}
        </div>
      ))}
      {rows.slice(1).map((row, i) =>
        row.map((cell, j) => (
          <div
            key={`${i}:${j}`}
            className={cx(
              "border-b border-gray-500 border-dotted col-span-1 pb-3 pt-3 pr-1 table-data",
              {
                "text-right": j === 2 && rows[0][2] === "table",
              }
            )}
          >
            {cell}
          </div>
        ))
      )}
    </div>
  );
};

export default Table;
