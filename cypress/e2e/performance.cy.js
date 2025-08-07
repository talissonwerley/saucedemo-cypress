describe('Usuário performance_glitch_user', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
    cy.fixture('example').then((data) => {
      const user = data.performanceUser

      cy.get('[data-test="username"]').type(user.username)
      cy.get('[data-test="password"]').type(user.password)
      cy.get('#login-button').click()
      cy.url().should('include', '/inventory.html')
    })
  })

  it('Deve acessar a página de inventário, mesmo com lentidão', () => {
    // Tempo padrão do Cypress é 4s para should(), vamos aumentar para garantir
    cy.url({ timeout: 10000 }).should('include', '/inventory.html')
    cy.screenshot('Teste de performance - página de inventário carregada')
  })

  it('Deve permitir interação com produtos após o carregamento', () => {
    // Espera até os produtos estarem visíveis
    cy.get('.inventory_item', { timeout: 10000 }).should(
      'have.length.greaterThan',
      0
    )
    cy.screenshot('Teste de performance - produtos visíveis')
    // Interage com o primeiro botão de adicionar ao carrinho
    cy.get('.btn_inventory').first().click()
    cy.get('.shopping_cart_badge').should('contain', '1')
    cy.screenshot('Teste de performance - produto adicionado')
  })
})
