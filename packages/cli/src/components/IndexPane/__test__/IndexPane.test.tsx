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

    it("selects an item with a click", async () => {
      const { findByRole, user, findByText } = setup(
        <IndexPane previews={previews} />
      );
      const item = await findByText("AccountCreated");
      await user.click(item);
      const selected = await findByRole("treeitem", {
        selected: true,
        expanded: false,
      });
      expect(selected.textContent).toBe("AccountCreated");
    });

    it("collapses an item with a click", async () => {
      const { findByRole, user, findByLabelText } = setup(
        <IndexPane previews={previews} />
      );
      const item = await findByLabelText("Toggle /previews/AccountCreated");
      await user.click(item);
      const collapsed = await findByRole("treeitem", {
        selected: true,
        expanded: false,
      });
      expect(collapsed.textContent).toBe("AccountCreated");

      await user.click(item);

      const expanded = await findByRole("treeitem", {
        selected: true,
        expanded: true,
      });
      expect(expanded.textContent).toBe("AccountCreated");
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
        name: "AccountCreated - accountCreated",
      });
      expect(selectedInitially.textContent).toBe(
        "AccountCreatedaccountCreated"
      );
      await user.type(list, "{ArrowDown}");
      const selected = await findByRole("option", {
        selected: true,
        name: "NewSignIn - newSignIn",
      });
      expect(selected.textContent).toBe("NewSignInnewSignIn");
    });
  });
});
