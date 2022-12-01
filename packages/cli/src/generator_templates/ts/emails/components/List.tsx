import React from "react";
import { MjmlRaw } from "mjml-react";

import { themeDefaults } from "../theme";

type ListProps = {
  items: string[];
} & React.ComponentProps<typeof MjmlRaw>;

export default function List({ items }: ListProps) {
  return (
    <MjmlRaw>
      <tr>
        <td>
          <table
            border={0}
            cellPadding={0}
            cellSpacing={0}
            role="presentation"
            width="100%"
          >
            {items.map((item, index) => (
              <tr key={index} className="text">
                <td
                  style={{ ...themeDefaults }}
                  align="center"
                  valign="top"
                  width={25}
                >
                  •
                </td>
                <td style={{ ...themeDefaults }}>{item}</td>
              </tr>
            ))}
          </table>
        </td>
      </tr>
    </MjmlRaw>
  );
}
