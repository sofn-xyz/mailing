describe("login tests", () => {
  beforeEach(() => {
    cy.task("db:reset");
  });

  it("should show the login page", () => {
    cy.visit("/login");
    cy.location("pathname").should("eq", "/login");
  });
});
