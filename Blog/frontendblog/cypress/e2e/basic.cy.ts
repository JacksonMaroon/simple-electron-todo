describe("Basic tests", () => {
  it("should visit the home page", () => {
    cy.visit("/")
    cy.contains("h1", "Gwern-Inspired Blog")
  })

  it("should navigate to tags page", () => {
    cy.visit("/")
    cy.contains("Tags").click()
    cy.url().should("include", "/tags")
    cy.contains("h1", "Tags")
  })

  it("should navigate to series page", () => {
    cy.visit("/")
    cy.contains("Series").click()
    cy.url().should("include", "/series")
    cy.contains("h1", "Series")
  })

  it("should navigate to links page", () => {
    cy.visit("/")
    cy.contains("Links").click()
    cy.url().should("include", "/links")
    cy.contains("h1", "Links")
  })

  it("should open the search dialog with keyboard shortcut", () => {
    cy.visit("/")
    cy.get("body").type("{cmd+k}")
    cy.contains("Search posts...")
  })

  it("should toggle theme", () => {
    cy.visit("/")
    cy.get("html").should("not.have.class", "dark")
    cy.get("button[aria-label='Toggle theme']").click()
    cy.get("html").should("have.class", "dark")
  })
})
