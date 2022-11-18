describe("audience", () => {
  beforeEach(() => {
    cy.task("db:reset");
    cy.signup();
  });

  it("should show subscribers on the /audiences page", () => {
    // subscribe a user to the default list
    cy.visit("/settings");
    cy.get("a").contains("Subscribe").click();
    cy.get("input#email").type("ok@ok.com");
    cy.get("button[type=submit]").click();
    cy.get("body").should("contain", "Thanks for subscribing!");

    // ok@ok.com should appear on the /audiences page
    cy.visit("/audiences");
    cy.get(".table-data").should("contain", "ok@ok.com");
  });
});
