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
    cy.get("h1").should("contain", "Settings");

    // you should see a default api key that was created
    cy.get("#api-keys tbody tr").should("have.length", 1);

    // you should see a button to add an API key
    cy.get("button").should("contain", "New API Key");

    // click the button to add an API key
    cy.get("button").click();

    // you should see 2 api keys in the tbody instead of 1
    cy.get("#api-keys tbody tr").should("have.length", 2);

    // you should get a 404 if you try to go back to /signup, only 1 user is allowed to signup
    cy.visit("/signup", { failOnStatusCode: false });
    cy.request({
      url: "/signup",
      followRedirect: false,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.redirectedToUrl).to.eq(undefined);
    });

    // logout
    cy.request({
      url: "/api/logout",
    }).then((response) => {
      expect(response.status).to.eq(200);
    });

    cy.visit("/settings", { failOnStatusCode: false });
    cy.request({
      url: "/settings",
      followRedirect: false,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(307);
      expect(response.redirectedToUrl).to.eq("http://localhost:3883/login");
    });
  });

  it("login is required on /settings", () => {
    cy.visit("/settings", { failOnStatusCode: false });
    cy.request({
      url: "/settings",
      followRedirect: false,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(307);
      expect(response.redirectedToUrl).to.eq("http://localhost:3883/login");
    });
  });
});
