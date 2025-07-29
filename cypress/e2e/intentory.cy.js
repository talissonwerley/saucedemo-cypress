describe('Página de Produtos - Inventário', () => {
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

  it('Ordenar produtos por nome (A a Z)', () => {
    cy.get('.product_sort_container').select('Name (A to Z)')
    let nomes = []
    cy.get('.inventory_item_name')
      .each(($el) => {
        nomes.push($el.text())
      })
      .then(() => {
        const ordenado = [...nomes].sort()
        expect(nomes).to.deep.equal(ordenado)
      })
  })

  it('Ordenar produtos por nome (Z a A)', () => {
    cy.get('.product_sort_container').select('Name (Z to A)')
    let nomes = []
    cy.get('.inventory_item_name')
      .each(($el) => {
        nomes.push($el.text())
      })
      .then(() => {
        const ordenado = [...nomes].sort().reverse()
        expect(nomes).to.deep.equal(ordenado)
      })
  })

  it('Ordenar produtos por preço (baixo para alto)', () => {
    cy.get('.product_sort_container').select('Price (low to high)')
    let precos = []
    cy.get('.inventory_item_price')
      .each(($el) => {
        precos.push(parseFloat($el.text().replace('$', '')))
      })
      .then(() => {
        const ordenado = [...precos].sort((a, b) => a - b)
        expect(precos).to.deep.equal(ordenado)
      })
  })

  it('Ordenar produtos por preço (alto para baixo)', () => {
    cy.get('.product_sort_container').select('Price (high to low)')
    let precos = []
    cy.get('.inventory_item_price')
      .each(($el) => {
        precos.push(parseFloat($el.text().replace('$', '')))
      })
      .then(() => {
        const ordenado = [...precos].sort((a, b) => b - a)
        expect(precos).to.deep.equal(ordenado)
      })
  })
  it('Deve verificar e interagir com botões Add to cart', () => {
    // Verifica o botão específico do backpack
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
      .should('have.text', 'Add to cart')
      .click() // Clica no botão

    // Verificação alternativa case-insensitive
    cy.contains('#add-to-cart-sauce-labs-bike-light', /add to cart/i).should(
      'be.visible'
    )

    // Verifica todos os botões Add to cart
    cy.get('.btn_inventory').each(($btn) => {
      const btnText = $btn.text().trim()
      // Verifica se o texto é "Add to cart" OU "Remove"
      expect(btnText).to.match(/add to cart|remove/i)

      // Opcional: verifica se o botão tem a classe correta
      if (btnText.match(/add to cart/i)) {
        expect($btn).to.have.class('btn_primary')
      } else {
        expect($btn).to.have.class('btn_secondary')
      }
    })
  })
})
