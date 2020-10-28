describe('Start and login tests',function() {
  const testUser = {
    name: 'Pupkine W. User-1',
    login: 'pupkine-1@example.com',
    password: '123pupkine1'
  }
  const testUser2 = {
    name: 'Pupkine W. User-2',
    login: 'pupkine-2@example.com',
    password: '123pupkine2'
  }

  const testNewBlogs = [
    {
      title: 'testTitle1',
      author: 'testAuthor1',
      url: 'testURL1'
    },
    {
      title: 'testTitle2',
      author: 'testAuthor2',
      url: 'testURL2'
    },
    {
      title: 'testTitle3',
      author: 'testAuthor3',
      url: 'testURL3'
    },
  ]

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

  describe('When loged in', function() {
    beforeEach(() => {
      cy.login(testUser)
    })

    it('Create new blog', function() {
      cy.contains('button', 'Add new blog').click()
      cy.contains('Create new blog')
      cy.addNewBlogUi(testNewBlogs[0])
      cy.get('.blogList').children().should('have.length', 1)
      cy.get('.blogList>.blogList__item')
        .should('contain',testNewBlogs[0].title)
        .and('not.contain',testNewBlogs[0].url)
    })

    it('Add two likes to blog', function() {
      cy.addNewBlog(testNewBlogs[0])
      cy.get('.blogList>.blogList__item').contains('button', 'Show more').click()
      cy.get('.blogList>.blogList__item').find('[data-cy=likes-qty]').should('have.contain', '0')
      cy.get('.blogList>.blogList__item').find('[data-cy=likes-qty]').parent().contains('button', 'Like +').as('likeBtn')
      cy.get('@likeBtn').click()
      cy.get('.blogList>.blogList__item').find('[data-cy=likes-qty]').should('have.contain', '1')
      cy.get('@likeBtn').click()
      cy.get('.blogList>.blogList__item').find('[data-cy=likes-qty]').should('have.contain', '2')
    })
    it('Deleting a blog by its creator', function() {
      cy.addNewBlog(testNewBlogs[0])
      cy.get('.blogList>.blogList__item').should('exist')
      cy.get('.blogList>.blogList__item').contains('button', 'Show more').click()
      cy.get('.blogList>.blogList__item').find('[data-cy=likes-qty]').parent().contains('button', 'Delete').click()
      cy.get('.blogList>.blogList__item').should('not.exist')
    })

    it.only('Deleting a blog by its creator', function() {
      cy.addNewBlog(testNewBlogs[0])
      cy.request('POST', 'http://localhost:3000/api/users', testUser2)
      cy.login(testUser2)
      cy.get('.blogList>.blogList__item').should('exist')
      cy.get('.blogList>.blogList__item').contains('button', 'Show more').click()
      cy.get('.blogList>.blogList__item').contains('button', 'Delete').should('not.exist')
    })
  })
})