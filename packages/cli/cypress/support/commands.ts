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
    createList(name: string): Chainable<void>;
    subscribe(email: string, listName: string): Chainable<void>;
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

/* 
  Assigns aliases:
  - @defaultListId - the id of the default list
  - @defaultListMemberId - the id of the default list member
*/
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
      cy.wrap(response.body.member.id)
        .as("defaultListMemberId")
        .should("be.a", "string");
    });
  });
});

/* 
  Assigns alias:
  - @{listName}Id - the id of the list that was created
*/
Cypress.Commands.add("createList", (listName) => {
  cy.request({
    url: "/api/lists",
    method: "POST",
    body: {
      name: listName,
    },
  }).then((response) => {
    expect(response.status).to.eq(201);
    expect(response.body.list).to.have.property("id");

    cy.wrap(response.body.list.id, { timeout: 0 })
      .as(`${listName}Id`)
      .should("be.a", "string");
  });
});

/* 
  Assigns alias:
  - @{listName}MemberId - the id of the list member that was created
*/
Cypress.Commands.add("subscribe", (email, listName) => {
  cy.get(`@${listName}Id`).then((listId) => {
    expect(listId).to.be.a("string");

    cy.request({
      url: `/api/lists/${listId}/subscribe`,
      method: "POST",
      body: {
        email,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.member).to.have.property("id");

      cy.wrap(response.body.member.id, { timeout: 0 })
        .as(`${listName}MemberId`)
        .should("be.a", "string");
    });
  });
});
