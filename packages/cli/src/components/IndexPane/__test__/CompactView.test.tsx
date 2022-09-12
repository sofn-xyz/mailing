/**
 * @jest-environment jsdom
 */

import React from "react";
import CompactView from "../CompactView";
import { setup } from "../../../util/__test__/testUtils";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));

describe("CompactView", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/previews");
  });

  const previews: [string, string[]][] = [
    ["AccountCreated", ["accountCreated"]],
    ["NewSignIn", ["newSignIn"]],
    [
      "Reservation",
      ["reservationCanceled", "reservationChanged", "reservationConfirmed"],
    ],
    ["ResetPassword", ["resetPassword"]],
  ];

  it("navigates down", async () => {
    const { findByRole, user } = setup(<CompactView previews={previews} />);
    const tree = await findByRole("tree");
    await user.type(tree, "{ArrowDown}");
    const selected = await findByRole("treeitem", {
      selected: true,
      expanded: false,
    });
    expect(selected.textContent).toBe("AccountCreated");
  });

  it("navigates up down left right", async () => {
    const { findByRole, user } = setup(<CompactView previews={previews} />);
    const tree = await findByRole("tree");
    await user.type(tree, "{ArrowUp}{ArrowDown}{ArrowLeft}{ArrowRight}");
    const selected = await findByRole("treeitem", {
      selected: true,
      expanded: true,
    });
    expect(selected.textContent).toBe("Emails");
  });

  it("collapses emails", async () => {
    const { findByRole, user } = setup(<CompactView previews={previews} />);
    const tree = await findByRole("tree");
    await user.type(tree, "{ArrowLeft}");
    const selected = await findByRole("treeitem", {
      selected: true,
      expanded: false,
    });
    expect(selected.textContent).toBe("Emails");
  });
});
