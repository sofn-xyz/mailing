describe("signup and authenticate", () => {
  beforeEach(() => {
    cy.task("db:reset");
  });

  it("should be able to signup, login, logout, and everything else", () => {
    const email = "test@mailin.run";
    const password = "password";

    cy.visit("/signup");
    cy.location("pathname").should("eq", "/signup");

    cy.get("h1").should("contain", "Sign up");
    cy.get("input#email").should("exist");

    // invalid email should give an error
    cy.get("input#email").type("test");
    cy.get("button[type=submit]").click();
    cy.get(".form-error").should("contain", "email is invalid");

    // invalid password (blank) should give an error
    cy.get("input#email").clear().type(email);
    cy.get("button[type=submit]").click();
    cy.get(".form-error").should(
      "contain",
      "password should be at least 8 characters"
    );

    // fill in email and passord fields with valid values and then submit the form
    cy.get("input#email").clear().type(email);
    cy.get("input#password").type(password);
    cy.get("button[type=submit]").click();

    // it should redirect you to the settings page
    cy.location("pathname").should("eq", "/settings");
    cy.get("h1").should("contain", "Account");

    // you should see a default api key that was created
    cy.get("#api-keys .table-data").should("have.length", 3);

    // you should see a button to add an API key
    cy.get("button").should("contain", "New API Key");

    // click the button to add an API key
    cy.get("button").contains("New API Key").click();

    // you should see 2 api keys in the tbody instead of 1
    cy.get("#api-keys .table-data").should("have.length", 6);

    // you should get a temporary redirect to /settings if you try to go back to /signup, only 1 user is allowed to signup
    cy.visit("/signup", { failOnStatusCode: false });
    cy.request({
      url: "/signup",
      followRedirect: false,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(307);
      expect(response.redirectedToUrl).to.match(new RegExp("/settings"));
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

    // you can visit the login page
    cy.visit("/login");
    cy.location("pathname").should("eq", "/login");
    cy.get("h1").should("contain", "Log in");

    // it should give you an error if you try to login with the wrong password
    cy.get("input#email").type(email);
    cy.get("input#password").type("wrongpassword");
    cy.get("button[type=submit]").click();

    cy.get(".form-error").should("contain", "invalid password");
  });

  it("/settings requires authentication", () => {
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
