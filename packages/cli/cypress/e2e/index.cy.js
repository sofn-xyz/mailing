const { isBindingElement } = require("typescript");

describe("index page tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should redirect index to previewFunction with tree", () => {
    cy.location("pathname").should("eq", "/previews/Welcome/preview");

    cy.contains("preview")
      .should("have.attr", "aria-selected", "true")
      .should("have.attr", "role", "treeitem");
    cy.contains("Emails")
      .should("have.attr", "aria-expanded", "true")
      .should("have.attr", "aria-selected", "false")
      .should("have.attr", "role", "treeitem");
    cy.contains("Compact view").click();

    cy.get("[aria-selected=true]").contains("preview");
  });
});
