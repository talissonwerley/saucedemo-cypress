describe('Usuário problem_user', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
    cy.fixture('example').then((data) => {
      const user = data.problemUser

      cy.get('[data-test="username"]').type(user.username)
      cy.get('[data-test="password"]').type(user.password)
      cy.get('#login-button').click()
      cy.url().should('include', '/inventory.html')
    })
  })

  it('Deve acessar a página de inventário com sucesso', () => {
    cy.url().should('include', '/inventory.html')
  })

  it('Deve exibir imagens de produto corretamente', () => {
    cy.get('.inventory_item_img img').each(($img) => {
      // Verifica se o atributo "src" está presente e não está vazio
      cy.wrap($img)
        .should('have.attr', 'src')
        .and('match', /.+\.(jpg|png)/)
    })
  })

  it('Deve exibir nomes de produtos distintos', () => {
    const nomesProdutos = new Set()
    cy.get('.inventory_item_name')
      .each(($el) => {
        nomesProdutos.add($el.text())
      })
      .then(() => {
        // Se todos os nomes forem iguais, esse set terá apenas um item
        expect(nomesProdutos.size).to.be.greaterThan(1)
      })
  })
})
