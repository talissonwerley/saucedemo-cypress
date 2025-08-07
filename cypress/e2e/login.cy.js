describe('Login', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
  })

  it('Deve fazer login com credenciais válidas', () => {
    cy.fixture('example').then((data) => {
      const user = data.validUser

      cy.get('[data-test="username"]').type(user.username)
      cy.get('[data-test="password"]').type(user.password)
      cy.get('#login-button').click()
      cy.screenshot('login com sucesso')
      cy.url().should('include', '/inventory.html')
    })
  })

  it('Não deve fazer login com credenciais inválidas', () => {
    cy.fixture('example').then((data) => {
      const user = data.invalidUser

      cy.get('[data-test="username"]').type(user.username)
      cy.get('[data-test="password"]').type(user.password)
      cy.get('#login-button').click()
      cy.get('[data-test="error"]').should(
        'contain.text',
        'Username and password do not match any user'
      )
      cy.screenshot('login com falha')
    })
  })
  it('Não deve fazer login com usiuario bloqueado', () => {
    cy.fixture('example').then((data) => {
      const user = data.lockedUser

      cy.get('[data-test="username"]').type(user.username)
      cy.get('[data-test="password"]').type(user.password)
      cy.get('#login-button').click()
      cy.url().should('eq', 'https://www.saucedemo.com/')
      cy.get('[data-test="error"]').should(
        'contain.text',
        'Epic sadface: Sorry, this user has been locked out.'
      )
      cy.screenshot('login bloqueado')
    })
  })
})
