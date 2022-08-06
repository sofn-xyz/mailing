describe("cypress tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should show the preview server index page", () => {
    cy.get("h1").should("contain", "previews");
    cy.get(".email-group").should("have.length", 2);
    cy.get(".email-group:first .email-container").should("have.length", 3);
    cy.get(".email-group:last .email-container").should("have.length", 1);
  });

  it("clicking a link should load the preview", () => {
    cy.get(".email-group:first .email-container:first .email").click();
    cy.location("pathname").should(
      "match",
      /previews\/TextEmail\.[jt]sx\/accountDeleted/
    );
  });
});
