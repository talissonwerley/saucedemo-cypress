describe('Responsividade do site', () => {
  const viewports = [
    { device: 'iPhone X', width: 375, height: 812 },
    { device: 'iPad', width: 768, height: 1024 },
    { device: 'Desktop', width: 1280, height: 720 },
  ]

  viewports.forEach((viewport) => {
    it(`Deve exibir corretamente o layout em ${viewport.device}`, () => {
      cy.viewport(viewport.width, viewport.height)
      cy.visit('https://www.saucedemo.com')
      cy.fixture('example').then((data) => {
        const user = data.validUser

        cy.get('[data-test="username"]').type(user.username)
        cy.get('[data-test="password"]').type(user.password)
        cy.get('#login-button').click()
        cy.url().should('include', '/inventory.html')

        // Verifica se os produtos são exibidos corretamente
        cy.get('.inventory_item').should('have.length.greaterThan', 0)
        cy.get('.shopping_cart_link').should('be.visible')
      })
    })
  })
})
