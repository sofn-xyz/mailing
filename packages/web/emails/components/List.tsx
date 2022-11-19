import { MjmlRaw } from "mjml-react";

import { fontSize, themeDefaults } from "../theme";

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
              <tr key={index} style={{ height: 28 }}>
                <td
                  style={{ ...themeDefaults, fontSize: fontSize.lg }}
                  align="center"
                  valign="top"
                  width={40}
                >
                  •
                </td>
                <td style={{ ...themeDefaults, fontSize: fontSize.lg }}>
                  {item}
                </td>
              </tr>
            ))}
          </table>
        </td>
      </tr>
    </MjmlRaw>
  );
}
