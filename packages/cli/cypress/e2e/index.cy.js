describe("cypress tests", () => {
  beforeEach(() => {
    cy.visit("/");
  })

  it("should show the preview server index page", () => {
    cy.get("h1").should("contain", "Preview");
  }
  
  
  )
  ;
})