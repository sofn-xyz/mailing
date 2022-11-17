// describe("unsubscribe page with multiple lists", () => {
//   it("should show the right interface for multiple lists", async () => {
//     cy.visit(`/unsubscribe/${memberId}`);
//     cy.get("h1").should("contain", "Email preferences");

//     // it should not show the nav
//     cy.get("nav").should("not.exist");

//     // check that the user is not unsubscribed
//     cy.get("label").should("have.length", 1);
//     cy.get("label").should("contain", "Unsubscribe from all emails");
//     cy.get("input[type=checkbox]").should("have.length", 1);
//     cy.get("input[type=checkbox]").should("not.be.checked");

//     // check the unsubscribe all checkbox
//     cy.get("input[type=checkbox]").check();
//     // click the submit button
//     cy.get("button").click();

//     // should see "Saved!" message
//     cy.get("div").should("contain", "Saved!");

//     // the user's status should be unsubscribed
//     cy.request({
//       url: `/api/lists/${listId}/members/${memberId}`,
//     }).then((response) => {
//       expect(response.status).to.eq(200);
//       expect(response.body.member.status).to.eq("unsubscribed");
//     });
//   });
// });

describe("unsubscribe page with only the default list", () => {
  let listId: string;
  let memberId: string;

  before(() => {
    cy.task("db:reset");
    cy.signup();

    // get the defalt list id from the database
    cy.request({
      url: `/api/lists`,
    })
      .then((response) => {
        expect(response.status).to.eq(200);

        listId = response.body.lists[0].id;
        expect(listId).to.be.a("string");
      })
      .then(() => {
        // subscribe a user to the default list
        cy.request({
          url: `/api/lists/${listId}/subscribe`,
          method: "POST",
          body: {
            email: "test@test.com",
          },
        }).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body.member).to.have.property("id");
          memberId = response.body.member.id;

          expect(memberId).to.be.a("string");
        });
      });
  });

  it("should show the right interface for just the default list", async () => {
    cy.intercept("/api/unsubscribe/*").as("patchUnsubscribe");

    cy.visit(`/unsubscribe/${memberId}`);

    // it should not show the nav
    cy.get("nav").should("not.exist");

    // if you're subscribed, it should show the unsubscribe button and we click it
    cy.get("h1").should("contain", "You're subscribed");
    cy.get("button[type=submit]").should("contain", "Unsubscribe").click();
    cy.get(".form-success-message").should("contain", "Saved!");
    cy.wait("@patchUnsubscribe");

    // if you're unsubscribed, it should show the re-subscribe button and we click it
    cy.get("h1").should("contain", "You're unsubscribed");
    cy.get("button[type=submit]").should("contain", "Re-subscribe").click();
    cy.get(".form-success-message").should("contain", "Saved!");
    cy.wait("@patchUnsubscribe");

    // now it should show the subscribed state AND click it again to unsubscribe
    cy.get("h1").should("contain", "You're subscribed");
    cy.get("button[type=submit]").should("contain", "Unsubscribe").click();
    cy.get(".form-success-message").should("contain", "Saved!");
    cy.wait("@patchUnsubscribe");

    // if you reload the page, it should show the unsubscribed state
    cy.visit(`/unsubscribe/${memberId}`);
    cy.get("h1").should("contain", "You're unsubscribed");
    cy.get("button[type=submit]").should("contain", "Re-subscribe").click();
    cy.get(".form-success-message").should("contain", "Saved!");
    cy.wait("@patchUnsubscribe");

    // if you reload the page, it should show the subscribed state
    cy.get("h1").should("contain", "You're subscribed");
    cy.get("button[type=submit]").should("contain", "Unsubscribe");
    cy.get(".form-success-message").should("contain", "Saved!");
  });
});
