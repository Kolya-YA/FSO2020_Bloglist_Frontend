describe('My first Cypress test!',function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
  })
  it('Login form is shown', function() {
    cy.contains('Login to Bloglist application')
    // expect(true).to.equal(true)
  })
})