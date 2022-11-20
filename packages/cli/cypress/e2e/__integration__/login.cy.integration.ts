describe("login", () => {
  beforeEach(() => {
    cy.task("db:reset");
    cy.signup();
  });

  it("you can login with valid credentials", function () {
    const email = this.email;
    const password = this.password;

    expect(email).to.be.a("string");
    expect(password).to.be.a("string");

    // it should redirect to the login page
    cy.visit("/login");
    cy.get("h1").should("contain", "Log in");

    // fill in email and passord fields and then submit the form
    cy.get("input#email").type(email);
    cy.get("input#password").type(password);
    cy.get("button[type=submit]").click();

    // it should redirect you to the /settings page
    cy.location("pathname").should("eq", "/settings");
  });

  it("should show the user an error message if they try to login with an invalid email", () => {
    // visit the login page
    cy.visit("/login");
    cy.location("pathname").should("eq", "/login");
    cy.get("h1").should("contain", "Log in");

    // fill in email and passord fields and then submit the form
    cy.get("input#email").type("i@didnsignup.com");
    cy.get("input#password").type("password");
    cy.get("button[type=submit]").click();

    // it should show an error message
    cy.get("div.form-error").should(
      "contain",
      "No user exists with that email."
    );
  });
});
