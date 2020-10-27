describe('My first Cypress test!',function() {
  const testUser = {
    name: 'Pupkine W. User-1',
    login: 'pupkine-1@example.com',
    password: '123pupkine1'
  }
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    cy.request('POST', 'http://localhost:3000/api/users', testUser)
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
  })

  it('Login form is shown', function() {
    cy.contains('Login to Bloglist application')
  })

  describe('Login test' , function() {
    it('Succeeds with correct credentials' , function() {
      cy.get('input:first').clear().type(testUser.login)
      cy.get('input:last').clear().type(testUser.password)
      cy.get('button').contains('Login').click()
      cy.contains(`${testUser.name} logged in.`)
      cy.get('button').contains('Logout').click()
    })

    it('Succeeds with wrong credentials' , function() {
      cy.get('input:first').clear().type('Qwerty')
      cy.get('input:last').clear().type('qwerty')
      cy.get('button').contains('Login').click()
      cy.get('.notification--error')
        .should('have.css', 'border-color', 'rgb(220, 20, 60)')
        .contains('Invalid login or password.')
    })
  })
})