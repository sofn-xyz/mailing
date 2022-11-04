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
  }
}

Cypress.Commands.add("signup", () => {
  const email = "test123@mailing.run";
  cy.visit("/signup");
  cy.location("pathname").should("eq", "/signup");

  cy.get("input#email").type(email);
  cy.get("input#password").type("password");
  cy.get("form").submit();

  // it should redirect to the login page
  cy.location("pathname").should("eq", "/login");
  cy.get("h1").should("contain", "Login");

  // fill in email and passord fields and then submit the form
  cy.get("input#email").type(email);
  cy.get("input#password").type("password");
  cy.get("form").submit();

  cy.location("pathname").should("eq", "/settings");
});
