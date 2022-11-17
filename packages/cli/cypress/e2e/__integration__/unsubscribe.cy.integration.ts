describe("unsubscribe page", () => {
  before(() => {
    cy.task("db:reset");
  });

  it("should not show the nav", async () => {
    cy.signup();

    // get the defalt list id from the database
    cy.request({
      url: `/api/lists`,
    }).then((response) => {
      expect(response.status).to.eq(200);

      const listId = response.body.lists[0].id;
      expect(listId).to.be.a("string");

      // subscribe a user to the default list
      cy.request({
        url: `/api/lists/${listId}/subscribe`,
        method: "POST",
        body: {
          email: "test@test.com",
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        const {
          member: { id: memberId },
        } = response.body;

        expect(memberId).to.be.a("string");

        // unsubscribe the user
        cy.visit(`/unsubscribe/${memberId}`);
        cy.get("h1").should("contain", "Email preferences");
        cy.get("nav").should("not.exist");

        // check that the user is not unsubscribed
        cy.get("label").should("have.length", 1);
        cy.get("label").should("contain", "Unsubscribe from all emails");
        cy.get("input[type=checkbox]").should("have.length", 1);
        cy.get("input[type=checkbox]").should("not.be.checked");

        // check the unsubscribe all checkbox
        cy.get("input[type=checkbox]").check();
        // click the submit button
        cy.get("button").click();

        // should see "Saved!" message
        cy.get("div").should("contain", "Saved!");

        // the user's status should be unsubscribed
        cy.request({
          url: `/api/lists/${listId}/members/${memberId}`,
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.member.status).to.eq("unsubscribed");
        });
      });
    });
  });
});
