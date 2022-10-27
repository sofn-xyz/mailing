describe("login tests", () => {
  before(() => {
    cy.task("db:reset");
  });

  it("should show the login page", () => {
    cy.visit("/signup");
    cy.location("pathname").should("eq", "/signup");

    cy.get("h1").should("contain", "Signup");
    cy.get("input#email").should("exist");

    // fill in email and passord fields and then submit the form
    cy.get("input#email").type("test@test.com");
    cy.get("input#password").type("password");
    cy.get("form").submit();

    // it should redirect to the login page
    cy.location("pathname").should("eq", "/login");

    // fill in email and passord fields and then submit the form
    cy.get("input#email").type("test@test.com");
    cy.get("input#password").type("password");
    cy.get("form").submit();

    cy.location("pathname").should("eq", "/settings");
  });
});
