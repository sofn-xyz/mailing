describe("index page tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should redirect index to previewFunction with tree", () => {
    cy.location("pathname").should("eq", "/previews/Welcome/preview");

    // Scope to the treeitem rather than the label text so the assertions stay
    // valid when the label is wrapped (e.g. in a truncating element).
    cy.contains('[role="treeitem"]', "preview")
      .should("have.attr", "aria-selected", "true")
      .should("have.attr", "role", "treeitem");
    cy.contains('[role="treeitem"]', "Emails")
      .should("have.attr", "aria-expanded", "true")
      .should("have.attr", "aria-selected", "false")
      .should("have.attr", "role", "treeitem");
    cy.contains("Compact view").click();

    cy.get("[aria-selected=true]").contains("preview");
  });
});
