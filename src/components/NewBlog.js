import React, { useState } from 'react'
const NewBlog = props => {
  const {
    createNewBlog,
  } = props

  
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [showNewBlogForm , setShowNewBlogForm] = useState(false)

  const btnText = showNewBlogForm ? 'Cancel' : 'Add new blog'

  const handleToggleNewBlogForm = event => {
    event.preventDefault()
    setShowNewBlogForm(!showNewBlogForm)
  }

  const handleNewBlogChange = e => {
    setNewBlog({...newBlog, [e.target.name]: e.target.value })
  }

  const addNewBlog = event => {
    event.preventDefault()
    createNewBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <section>
      { showNewBlogForm &&
        <div>
        <h3>Create new blog</h3>
        <form onSubmit={addNewBlog}>
          <label>Title: 
            <input
              type='text'
              // required
              value={newBlog.title}
              name='title'
              onChange={handleNewBlogChange}
              />
          </label>
          <br/>
          <label>Author: 
            <input
              type='text'
              // required
              value={newBlog.author}
              name='author'
              onChange={handleNewBlogChange}
              />
          </label>
          <br/>
          <label>URL: 
            <input
              type='text'
              // required
              value={newBlog.url}
              name='url'
              onChange={handleNewBlogChange}
              />
          </label>
          <br />
          <button type='submit'>Create new blog</button>
        </form>
      </div>
      }
      <button onClick={handleToggleNewBlogForm}>{btnText}</button>
    </section>
  )
}

export default NewBlog