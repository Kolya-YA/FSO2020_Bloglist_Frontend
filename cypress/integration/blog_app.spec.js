describe('Start and login tests',function() {
  const testUser = {
    name: 'Pupkine W. User-1',
    login: 'pupkine-1@example.com',
    password: '123pupkine1'
  }

  const testNewBlog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testURL'
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

  describe('Login form test' , function() {
    it('Succeeds with correct credentials' , function() {
      cy.loginUi(testUser)
      cy.contains(`${testUser.name} logged in.`)
      cy.get('button').contains('Logout').click()
    })

    it('Succeeds with wrong credentials' , function() {
      cy.loginUi({ login: 'Qwerty', password: 'qwerty123' })
      cy.get('.notification--error')
        .should('have.css', 'border-color', 'rgb(220, 20, 60)')
        .and('have.css', 'border-style', 'solid')
        .and('contain', 'Invalid login or password.')
    })
  })

  describe.only('When loged in', function() {
    beforeEach(function() {
      cy.login(testUser)
    })

    it('Create new blog', function() {
      cy.contains('button', 'Add new blog').click()
      cy.contains('Create new blog')
      cy.addNewBlogUi(testNewBlog)
      cy.get('.blogList').children().should('have.length', 1)
      cy.get('.blogList>.blogList__item')
        .should('contain',testNewBlog.title)
        .and('not.contain',testNewBlog.url)
    })
  })
})