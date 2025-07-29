describe('Logout', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
    cy.fixture('example').then((data) => {
      const user = data.validUser

      cy.get('[data-test="username"]').type(user.username)
      cy.get('[data-test="password"]').type(user.password)
      cy.get('#login-button').click()
      cy.url().should('include', '/inventory.html')
    })
  })

  it('Deve realizar logout com sucesso', () => {
    cy.get('.bm-burger-button').click()
    cy.get('.bm-menu').should('be.visible')
    cy.get('#logout_sidebar_link').should('be.visible').click()
    cy.url().should('eq', 'https://www.saucedemo.com/')
  })
})
