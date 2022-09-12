/**
 * @jest-environment jsdom
 */

import React from "react";
import IndexPane from "../IndexPane";
import { setup } from "../../../util/__test__/testUtils";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));

describe("IndexPane", () => {
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

  describe("CompactView", () => {
    it("navigates down", async () => {
      const { findByRole, user } = setup(<IndexPane previews={previews} />);
      const tree = await findByRole("tree");
      await user.type(tree, "{ArrowDown}");
      const selected = await findByRole("treeitem", {
        selected: true,
        expanded: false,
      });
      expect(selected.textContent).toBe("AccountCreated");
    });

    it("navigates up down left right", async () => {
      const { findByRole, user } = setup(<IndexPane previews={previews} />);
      const tree = await findByRole("tree");
      await user.type(tree, "{ArrowUp}{ArrowDown}{ArrowLeft}{ArrowRight}");
      const selected = await findByRole("treeitem", {
        selected: true,
        expanded: true,
      });
      expect(selected.textContent).toBe("Emails");
    });

    it("collapses emails", async () => {
      const { findByRole, user } = setup(<IndexPane previews={previews} />);
      const tree = await findByRole("tree");
      await user.type(tree, "{ArrowLeft}");
      const selected = await findByRole("treeitem", {
        selected: true,
        expanded: false,
      });
      expect(selected.textContent).toBe("Emails");
    });
  });

  describe("ClientView", () => {
    it("navigates down", async () => {
      const { findByRole, user, findByLabelText } = setup(
        <IndexPane previews={previews} />
      );
      const toggle = await findByLabelText("Show compact view");
      await user.click(toggle);
      const list = await findByRole("listbox");
      const selectedInitially = await findByRole("option", {
        selected: true,
      });
      expect(selectedInitially.textContent).toBe("accountCreated");
      await user.type(list, "{ArrowDown}");
      const selected = await findByRole("option", {
        selected: true,
      });
      expect(selected.textContent).toBe("newSignIn");
    });
  });
});
