describe("Authentication", () => {
  it("should navigate to sign in page", () => {
    cy.visit("/")
    cy.contains("Sign In").click()
    cy.url().should("include", "/sign-in")
    cy.contains("h1", "Sign In")
  })

  it("should show validation errors on sign in form", () => {
    cy.visit("/sign-in")
    cy.get("button[type='submit']").click()
    cy.contains("Please enter a valid email address")
    cy.contains("Password must be at least 8 characters")
  })

  it("should navigate to sign up page", () => {
    cy.visit("/sign-in")
    cy.contains("Don't have an account? Sign Up").click()
    cy.url().should("include", "/sign-up")
    cy.contains("h1", "Create an account")
  })

  it("should show validation errors on sign up form", () => {
    cy.visit("/sign-up")
    cy.get("button[type='submit']").click()
    cy.contains("Please enter a valid email address")
    cy.contains("Password must be at least 8 characters")
  })

  it("should navigate to reset password page", () => {
    cy.visit("/sign-in")
    cy.contains("Forgot your password?").click()
    cy.url().should("include", "/reset-password")
    cy.contains("h1", "Reset Password")
  })
})
