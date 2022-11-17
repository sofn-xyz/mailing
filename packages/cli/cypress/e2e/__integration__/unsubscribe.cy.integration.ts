describe("unsubscribe page", () => {
  describe("just the default list", () => {
    beforeEach(() => {
      const email = "test@test.com";
      cy.wrap(email).as("email");

      cy.task("db:reset");
      cy.signup();

      cy.subscribeToDefaultList(email);
    });

    it("should show the right interface for just the default list", function () {
      cy.intercept("/api/unsubscribe/*").as("patchUnsubscribe");
      cy.visit(`/unsubscribe/${this.memberId}`);
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
      cy.visit(`/unsubscribe/${this.memberId}`);
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

  describe("with an additional list", () => {
    beforeEach(() => {
      const email = "test@test.com";
      cy.wrap(email).as("email");

      cy.task("db:reset");
      cy.signup();

      cy.subscribeToDefaultList(email);

      // create an additional list called anotherList
      cy.request({
        url: "/api/lists",
        method: "POST",
        body: {
          name: "anotherList",
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.list).to.have.property("id");
        const anotherListId = response.body.list.id;
        expect(anotherListId).to.be.a("string");

        cy.wrap(anotherListId).as("anotherListId");

        // subscribe the same user to anotherList
        cy.request({
          url: `/api/lists/${anotherListId}/subscribe`,
          method: "POST",
          body: {
            email: email,
          },
        }).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body.member).to.have.property("id");
          const memberId = response.body.member.id;
          expect(memberId).to.be.a("string");

          cy.wrap(memberId).as("anotherListMemberId");
        });
      });
    });

    it("should show the right interface for multiple lists", function () {
      cy.visit(`/unsubscribe/${this.memberId}`);
      cy.get("h1").should("contain", "Email preferences");
      // it should not show the nav
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
        url: `/api/lists/${this.defaultListId}/members/${this.memberId}`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.member.status).to.eq("unsubscribed");
      });
    });
  });
});
