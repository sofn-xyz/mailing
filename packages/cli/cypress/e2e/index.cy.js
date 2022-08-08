const { isBindingElement } = require("typescript");

describe("cypress tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should show the preview server index page", () => {
    cy.get("h1").should("contain", "previews");
    cy.get(".email-group").should("have.length", 2);

    // TextEmail group should have 3 previews
    cy.get(".email-group")
      .contains("TextEmail")
      .siblings(".email-container")
      .should("have.length", 3);

    // Welcome group should have 1 preview
    cy.get(".email-group")
      .contains("Welcome")
      .siblings(".email-container")
      .should("have.length", 1);
  });

  it("clicking a link should load the preview", () => {
    cy.get(".email-group .email-container .email")
      .contains("accountDeleted")
      .click();

    cy.location("pathname").should(
      "match",
      /previews\/TextEmail\.[jt]sx\/accountDeleted/
    );
  });
});
