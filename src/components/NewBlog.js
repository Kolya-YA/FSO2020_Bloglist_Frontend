import React from 'react'
const NewBlog = props => {
  const {
    newBlog,
    setNewBlog,
    handleNewBlogSubmit,
  } = props

  const handleNewBlogChange = e => {
    setNewBlog({...newBlog, [e.target.name]: e.target.value })
  }

  return (
    <>
      <h3>Create new blog</h3>
      <form onSubmit={handleNewBlogSubmit}>
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
    </>
  )
}

export default NewBlog