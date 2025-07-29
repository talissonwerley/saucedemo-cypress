describe('Carrinho de Compras - Múltiplos Produtos e Checkout', () => {
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

  it('Adicionar múltiplos produtos ao carrinho', () => {
    // Adiciona 3 produtos
    cy.get('.inventory_item').each(($el, index) => {
      if (index < 3) {
        cy.wrap($el).find('.btn_inventory').click()
      }
    })

    // Verifica se o badge do carrinho mostra "3"
    cy.get('.shopping_cart_badge').should('contain', '3')

    // Vai para o carrinho
    cy.get('.shopping_cart_link').click()
    cy.url().should('include', '/cart.html')

    // Verifica se há 3 itens listados no carrinho
    cy.get('.cart_item').should('have.length', 3)
  })

  it('Verificar total de valores no checkout', () => {
    const produtosSelecionados = []

    // Adiciona dois produtos e guarda seus preços
    cy.get('.inventory_item').each(($el, index) => {
      if (index < 2) {
        cy.wrap($el)
          .find('.inventory_item_price')
          .then(($price) => {
            const valor = parseFloat($price.text().replace('$', ''))
            produtosSelecionados.push(valor)
          })

        cy.wrap($el).find('.btn_inventory').click()
      }
    })

    // Vai para o carrinho
    cy.get('.shopping_cart_link').click()

    // Clica em checkout
    cy.get('.checkout_button').click()

    // Preenche os dados obrigatórios
    cy.get('[data-test="firstName"]').type('Fulano')
    cy.get('[data-test="lastName"]').type('da Silva')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('.cart_button').click()

    // Verifica a soma dos produtos
    cy.get('.summary_subtotal_label').then(($label) => {
      const subtotalTexto = $label.text()
      const subtotalNaTela = parseFloat(
        subtotalTexto.replace('Item total: $', '')
      )

      const subtotalEsperado = produtosSelecionados.reduce(
        (total, valor) => total + valor,
        0
      )

      expect(subtotalNaTela).to.eq(subtotalEsperado)
    })

    // (Opcional) Verifica o valor final com taxa
    cy.get('.summary_tax_label')
      .invoke('text')
      .then((text) => {
        const taxa = parseFloat(text.replace('Tax: $', ''))
        cy.get('.summary_total_label')
          .invoke('text')
          .then((totalText) => {
            const total = parseFloat(totalText.replace('Total: $', ''))
            const esperado =
              produtosSelecionados.reduce((a, b) => a + b, 0) + taxa
            expect(total).to.eq(esperado)
          })
      })
  })
})
