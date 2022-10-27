describe("login tests", () => {
  beforeEach(() => {
    cy.task("log", "This will be output to the terminal");
  });

  it("should show the login page", () => {
    cy.visit("/login");
    cy.location("pathname").should("eq", "/login");
  });
});
