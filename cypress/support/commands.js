// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('loginUi', user => {
  cy.get('input:first').clear().type(user.login)
  cy.get('input:last').clear().type(user.password)
  cy.get('button').contains('Login').click()
})

Cypress.Commands.add('login', ({ login, password }) => {
  cy.request({
    url: 'http://localhost:3003/api/login',
    method: 'POST',
    body:  { login, password }
  })
    .then(({ body }) => {
      localStorage.setItem('loggedUser', JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('addNewBlogUi', newBlog => {
  cy.get('input[name=title]').clear().type(newBlog.title)
  cy.get('input[name=author]').clear().type(newBlog.author)
  cy.get('input[name=url]').clear().type(newBlog.url)
  cy.contains('button', 'Create new blog').click()
})