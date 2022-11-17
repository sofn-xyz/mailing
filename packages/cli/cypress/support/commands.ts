/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

/* eslint-disable-next-line @typescript-eslint/no-namespace */
declare namespace Cypress {
  interface Chainable {
    signup(): Chainable<void>;
    subscribeToDefaultList(email: string): Chainable<void>;
  }
}

Cypress.Commands.add("signup", () => {
  const email = "test123@mailing.run";
  cy.visit("/signup");
  cy.get("h1").should("contain", "Sign up");
  cy.location("pathname").should("eq", "/signup");

  cy.get("input#email").type(email);
  cy.get("input#password").type("password");
  cy.get("button[type=submit]").click();

  cy.location("pathname").should("eq", "/settings");
});

Cypress.Commands.add("subscribeToDefaultList", (email) => {
  // get the defalt list id from the database
  cy.request({
    url: `/api/lists`,
  }).then((response) => {
    expect(response.status).to.eq(200);
    const defaultListId = response.body.lists[0].id;
    expect(defaultListId).to.be.a("string");
    cy.wrap(defaultListId).as("defaultListId");
    // subscribe a user to the default list
    cy.request({
      url: `/api/lists/${defaultListId}/subscribe`,
      method: "POST",
      body: {
        email,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.member).to.have.property("id");
      const memberId = response.body.member.id;
      expect(memberId).to.be.a("string");
      cy.wrap(memberId).as("memberId");
    });
  });
});
