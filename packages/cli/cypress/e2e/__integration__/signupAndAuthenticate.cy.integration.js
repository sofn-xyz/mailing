describe("login tests", () => {
  before(() => {
    cy.task("db:reset");
  });

  it("should be able to signup, login, and everything else", () => {
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

    // it should redirect you to the settings page
    cy.location("pathname").should("eq", "/settings");

    // you should get a 404 if you try to go back to /signup
    cy.visit("/signup", { failOnStatusCode: false });
    cy.request({
      url: "/signup",
      followRedirect: false,
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(404);
      expect(resp.redirectedToUrl).to.eq(undefined);
    });
  });

  it("login is required on /settings", () => {
    cy.visit("/settings", { failOnStatusCode: false });
    cy.request({
      url: "/settings",
      followRedirect: false,
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(307);
      expect(resp.redirectedToUrl).to.eq("http://localhost:3883/login");
    });
  });
});
