describe("unsubscribe page", () => {
  describe("just the default list", () => {
    beforeEach(() => {
      const email = "test@test.com";

      cy.task("db:reset");
      cy.signup();
      cy.subscribeToDefaultList(email);
    });

    it("should show the checkbox interface for just the default list", function () {
      cy.get("@defaultListMemberId").then((defaultListMemberId) => {
        cy.visit(`/unsubscribe/${defaultListMemberId}`);
        // it should not show the nav
        cy.get("nav").should("not.exist");

        // if You’re subscribed, it should show the unsubscribe button and we click it
        cy.get("h1").should("contain", "You’re subscribed");
        cy.get("button[type=submit]").should("contain", "Unsubscribe").click();
        cy.get(".form-success-message").should("contain", "Saved!");

        // if You’re unsubscribed, it should show the re-subscribe button and we click it
        cy.get("h1").should("contain", "You’re unsubscribed");
        cy.get("button[type=submit]").should("contain", "Re-subscribe").click();
        cy.get(".form-success-message").should("contain", "Saved!");

        // now it should show the subscribed state AND click it again to unsubscribe
        cy.get("h1").should("contain", "You’re subscribed");
        cy.get("button[type=submit]").should("contain", "Unsubscribe").click();
        cy.get(".form-success-message").should("contain", "Saved!");

        // if you reload the page, it should show the unsubscribed state
        cy.visit(`/unsubscribe/${defaultListMemberId}`);
        cy.get("h1").should("contain", "You’re unsubscribed");
        cy.get("button[type=submit]").should("contain", "Re-subscribe").click();
        cy.get(".form-success-message").should("contain", "Saved!");

        // if you reload the page, it should show the subscribed state
        cy.get("h1").should("contain", "You’re subscribed");
        cy.get("button[type=submit]").should("contain", "Unsubscribe");
        cy.get(".form-success-message").should("contain", "Saved!");
      });
    });
  });

  describe("with an additional list", () => {
    beforeEach(() => {
      cy.task("db:reset");
      cy.signup();

      const email = "test@test.com";
      cy.subscribeToDefaultList(email);
      cy.createList("anotherList");
      cy.subscribe(email, "anotherList");
    });

    it("should show the right interface for multiple lists", function () {
      // get aliases
      const {
        defaultListId,
        defaultListMemberId,
        anotherListId,
        anotherListMemberId,
      } = this;
      expect(defaultListId).to.be.a("string");
      expect(defaultListMemberId).to.be.a("string");
      expect(anotherListId).to.be.a("string");
      expect(anotherListMemberId).to.be.a("string");

      cy.visit(`/unsubscribe/${defaultListMemberId}`);
      cy.get("h1").should("contain", "Email preferences");

      // it should not show the nav
      cy.get("nav").should("not.exist");

      // there should be 2 labels and checkboxes
      cy.get("label").should("have.length", 2);
      cy.get("input[type=checkbox]").should("have.length", 2);

      // check the initial state of the form
      // "anotherList" should be checked
      cy.get("label")
        .contains("anotherList")
        .as("anotherListLabel")
        .should("exist")
        .siblings("input[type=checkbox]")
        .should("be.checked");

      // "defaultList" should be unchecked
      cy.get("label")
        .contains("Unsubscribe from all emails")
        .as("defaultListLabel")
        .should("exist")
        .siblings("input[type=checkbox]")
        .should("not.be.checked");

      // check the "Unsubscribe all" checkbox
      cy.get("@defaultListLabel").click();
      cy.get("@defaultListLabel")
        .siblings("input[type=checkbox]")
        .should("be.checked");

      // the "anotherList" checkbox should still be checked and disabled
      cy.get("@anotherListLabel")
        .siblings("input[type=checkbox]")
        .should("be.checked")
        .should("be.disabled");

      // click the Save button
      cy.get("button[type=submit]").contains("Save").click();

      // should see "Saved!" message
      cy.get(".form-success-message").should("contain", "Saved!");

      // the user's status on the default list should be unsubscribed
      cy.request({
        url: `/api/lists/${defaultListId}/members/${defaultListMemberId}`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.member.status).to.eq("unsubscribed");
      });

      // the user's status on the "anotherList" list should be subscribed
      cy.request({
        url: `/api/lists/${anotherListId}/members/${anotherListMemberId}`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.member.status).to.eq("subscribed");
      });

      // reload the page
      cy.visit(`/unsubscribe/${defaultListMemberId}`);
      cy.get("h1").should("contain", "Email preferences");

      // the initial state of the form should be the same as before
      // the "Unsubscribe all" checkbox should be checked
      cy.get("@defaultListLabel")
        .siblings("input[type=checkbox]")
        .should("be.checked");

      // the "anotherList" checkbox should still be checked and disabled
      cy.get("@anotherListLabel")
        .siblings("input[type=checkbox]")
        .should("be.checked")
        .should("be.disabled");

      // uncheck the "Unsubscribe all" checkbox
      cy.get("@defaultListLabel").click();

      // the "defaultList" checkbox should be unchecked
      cy.get("@defaultListLabel")
        .siblings("input[type=checkbox]")
        .should("not.be.checked");

      // the "anotherList" checkbox should be checked and enabled
      cy.get("@anotherListLabel")
        .siblings("input[type=checkbox]")
        .should("be.checked");

      // submit the form
      cy.get("button[type=submit]").contains("Save").click();

      // should see "Saved!" message
      cy.get(".form-success-message").should("contain", "Saved!");

      // the user's status on the default list should be subscribed
      cy.request({
        url: `/api/lists/${defaultListId}/members/${defaultListMemberId}`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.member.status).to.eq("subscribed");
      });

      // the user's status on the "anotherList" list should be subscribed
      cy.request({
        url: `/api/lists/${anotherListId}/members/${anotherListMemberId}`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.member.status).to.eq("subscribed");
      });

      // uncheck the "anotherList" checkbox
      cy.get("@anotherListLabel").click();

      // the "anotherList" checkbox should be unchecked
      cy.get("@anotherListLabel")
        .siblings("input[type=checkbox]")
        .should("not.be.checked");

      // submit the form
      cy.get("button[type=submit]").contains("Save").click();

      // should see "Saved!" message
      cy.get(".form-success-message").should("contain", "Saved!");

      // the user's status on "anotherList" should be unsubscribed
      cy.request({
        url: `/api/lists/${anotherListId}/members/${anotherListMemberId}`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.member.status).to.eq("unsubscribed");
      });

      // the user's status on the default list should still be subscribed
      cy.request({
        url: `/api/lists/${defaultListId}/members/${defaultListMemberId}`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.member.status).to.eq("subscribed");
      });
    });
  });
});
