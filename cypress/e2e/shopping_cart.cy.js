describe('Carrinho de compras', () => {
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

  it('Deve adicionar produto ao carrinho', () => {
    cy.contains('.inventory_item_name', 'Sauce Labs Backpack')
      .parents('.inventory_item')
      .find('.btn_inventory')
      .click()

    cy.get('.shopping_cart_badge').should('be.visible').and('contain.text', '1')
    cy.get('.shopping_cart_link').click()
    cy.contains('Sauce Labs Backpack').should('be.visible')
  })

  it('Deve remover produto do carrinho', () => {
    // Adiciona o item
    cy.contains('.inventory_item_name', 'Sauce Labs Backpack')
      .parents('.inventory_item')
      .find('.btn_inventory')
      .click()
    cy.get('.shopping_cart_link').click()

    // Remove o item
    cy.contains('.cart_item', 'Sauce Labs Backpack')
      .find('.btn_secondary')
      .click()

    // Valida remoção
    cy.get('.shopping_cart_badge').should('not.exist')
    cy.get('.cart_item').should('not.exist')
  })
})
