import React from "react";
import { setup } from "../../util/__test__/testUtils";
import HTMLLint from "../HtmlLint";

describe("HTMLLint", () => {
  const data: HtmlLintError[] = [
    {
      message: "Oh no!",
    },
    {
      message: "Oh no again!",
    },
  ];

  it("should show error count and toggle error list visibility", async () => {
    const { findByText, user, getByRole } = setup(<HTMLLint htmlLint={data} />);

    const button = await findByText("2 HTML lint errors.");

    // list is hidden
    const listText = getByRole("list", { hidden: true }).textContent;
    expect(listText).toBe("1. Oh no!2. Oh no again!");

    await user.click(button);

    // list is visible
    getByRole("list", { hidden: false });

    // hide it again
    await user.click(button);
    getByRole("list", { hidden: true });
  });
});
