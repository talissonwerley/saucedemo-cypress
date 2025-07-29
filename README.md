# 🧪 Testes Automatizados com Cypress - SauceDemo

Este projeto contém uma automação de testes end-to-end para o site [SauceDemo](https://www.saucedemo.com), uma plataforma de vendas utilizada com fins educacionais e de prática de testes de software.

## 📚 Objetivo

Este repositório faz parte do meu estudo sobre **Qualidade de Software (QA)**, com foco em testes automatizados utilizando **JavaScript**, **Node.js** e o framework **Cypress**.

## 🚀 Tecnologias e Ferramentas

- [Node.js](https://nodejs.org/)
- [Cypress](https://www.cypress.io/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 📁 Estrutura do Projeto

```bash
saucedemo_cypress/
├── cypress/
│   ├── e2e/
│   │   ├── checkout.cy.js
│   │   ├── fixtures_example.cy.js
│   │   ├── inventory.cy.js
│   │   ├── login.cy.js
│   │   ├── logout.cy.js
│   │   ├── performance.cy.js
│   │   ├── problem_user.cy.js
│   │   ├── purchase_workflow.cy.js
│   │   ├── responsividade.cy.js
│   │   ├── shopping_cart.cy.js
│   │   └── visual_checkout_flow.cy.js
│   ├── fixtures/
│   │   └── example.json
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── cypress.config.js
├── package.json
├── package-lock.json
└── README.md
```

## 📦 Instalação

1. **Clone o repositório:**

git clone https://github.com/seu-usuario/saucedemo_cypress.git

cd saucedemo_cypress

2. **Instale as dependências:**

npm install cypress

3. **Executar com a interface gráfica:**

npx cypress open

4. **Executar em modo headless:**

npx cypress run

## 🧠 Testes Implementados

- Login com sucesso e falha

- Acesso ao inventário

- Adição e remoção de produtos no carrinho

- Fluxo completo de compra

- Checkout visual e funcional

- Testes com usuários problemáticos

- Teste de performance

- Responsividade da aplicação

## 📌 Notas

- Este projeto foi desenvolvido com fins de aprendizado e prática pessoal.

- Todos os testes foram escritos por Talisson Werley.
