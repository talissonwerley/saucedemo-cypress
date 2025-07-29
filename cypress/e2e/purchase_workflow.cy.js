describe('Fluxo de Compra Completo', () => {
  beforeEach(() => {
    // Login padrão
    cy.visit('https://www.saucedemo.com')
    cy.fixture('example').then((data) => {
      const user = data.validUser

      cy.get('[data-test="username"]').type(user.username)
      cy.get('[data-test="password"]').type(user.password)
      cy.get('#login-button').click()
      cy.url().should('include', '/inventory.html')
    })
  })

  it('Realizar fluxo de compra do início ao fim', () => {
    // Adiciona um produto ao carrinho
    cy.contains('.inventory_item', 'Sauce Labs Backpack')
      .find('.btn_inventory')
      .click()

    // Verifica se o carrinho tem 1 item
    cy.get('.shopping_cart_badge').should('contain', '1')

    // Acessa o carrinho
    cy.get('.shopping_cart_link').click()
    cy.url().should('include', '/cart.html')

    // Verifica se o produto está no carrinho
    cy.get('.cart_item').should('contain', 'Sauce Labs Backpack')

    // Prossegue para checkout
    cy.get('[data-test="checkout"]').click()
    cy.url().should('include', '/checkout-step-one.html')

    // Preenche os dados do cliente
    cy.get('[data-test="firstName"]').type('Maria')
    cy.get('[data-test="lastName"]').type('Silva')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()
    cy.url().should('include', '/checkout-step-two.html')

    // Verifica resumo da compra
    cy.get('.summary_info_label')
      .contains('Payment Information')
      .should('be.visible')
    cy.get('.cart_item').should('contain', 'Sauce Labs Backpack')

    // Finaliza o pedido
    cy.get('[data-test="finish"]').click()
    cy.url().should('include', '/checkout-complete.html')

    // Verifica mensagem de sucesso
    cy.get('.complete-header').should('have.text', 'Thank you for your order!')
    cy.get('.complete-text').should('contain', 'Your order has been dispatched')
  })
})
