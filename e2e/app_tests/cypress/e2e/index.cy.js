const { isBindingElement } = require("typescript");

describe("index page tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should redirect index to previewFunction with tree", () => {
    cy.location("pathname").should(
      "eq",
      "/previews/AccountCreated/accountCreated"
    );

    cy.contains("accountCreated")
      .should("have.attr", "aria-selected", "true")
      .should("have.attr", "role", "treeitem");
    cy.contains("Emails")
      .should("have.attr", "aria-expanded", "true")
      .should("have.attr", "aria-selected", "false")
      .should("have.attr", "role", "treeitem");
    cy.contains("Reservation")
      .should("have.attr", "aria-expanded", "true")
      .should("have.attr", "role", "treeitem")
      .should("have.attr", "role", "treeitem");
    cy.contains("ResetPassword")
      .should("have.attr", "aria-expanded", "true")
      .should("have.attr", "role", "treeitem");

    cy.contains("reservationChanged").click();
    cy.location("pathname").should(
      "eq",
      "/previews/Reservation/reservationChanged"
    );

    cy.contains("Compact view").click();

    cy.get("[aria-selected=true]").contains("reservationChanged");
  });
});
