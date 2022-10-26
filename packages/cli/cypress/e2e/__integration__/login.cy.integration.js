describe("login tests", () => {
  it("should show the login page", () => {
    cy.visit("/login");
    cy.location("pathname").should("eq", "/login");
  });
});
