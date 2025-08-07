describe('Fluxo visual de checkout - Saucedemo', () => {
  before(() => {
    // 1. Visita a página com verificação explícita
    cy.visit('https://www.saucedemo.com', {
      timeout: 15000,
      failOnStatusCode: false,
    })

    // 2. Verifica se estamos na página correta (modificado)
    cy.document().its('title').should('include', 'Swag Labs')

    // 3. Verificação alternativa do container de login (modificado)
    cy.get('#login_button_container')
      .should('exist')
      .then(() => {})

    // 4. Preenche login com seletores alternativos
    cy.fixture('example').then((data) => {
      const user = data.visualUser

      cy.get('#user-name, [data-test=username]', { timeout: 10000 })
        .should('be.visible')
        .type(user.username, { delay: 30 })

      cy.get('#password, [data-test=password]', { timeout: 10000 })
        .should('be.visible')
        .type(user.password, { delay: 30 })
    })

    cy.screenshot('login-credentials-filled')

    cy.get('.btn_action, [data-test=login-button]').click()

    // 5. Verifica redirecionamento pós-login
    cy.url().should('include', '/inventory.html')
    cy.get('.header_secondary_container .title').should('contain', 'Products')
  })

  it('Deve verificar os itens do inventário', () => {
    cy.get('.inventory_item', { timeout: 10000 }).should(($items) => {
      expect($items).to.have.length.greaterThan(0)
      expect($items.first()).to.be.visible
    })
    cy.screenshot('inventory-items-loaded')
  })
})
