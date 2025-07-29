describe('Fluxo visual de checkout - Saucedemo', () => {
  before(() => {
    // 1. Visita a página com verificação explícita
    cy.visit('https://www.saucedemo.com', {
      timeout: 15000, // Aumenta timeout para carregamento
      failOnStatusCode: false, // Ignora erros HTTP
    })

    // 2. Verifica se estamos na página correta
    cy.document().should(($doc) => {
      // Verifica se é a página de login pelo título
      const title = $doc.title.toLowerCase()
      expect(title).to.include('swag labs')
    })

    // 3. Verificação alternativa do container de login
    cy.get('body').then(($body) => {
      if ($body.find('#login_button_container').length === 0) {
        // Debug: tira print se não encontrar o elemento
        cy.screenshot('login-page-missing-element')
        throw new Error('Página de login não carregou corretamente')
      }
    })

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
  })
})
