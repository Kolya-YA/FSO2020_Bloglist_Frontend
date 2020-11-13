import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'

const NewBlog = () => {

  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [showNewBlogForm , setShowNewBlogForm] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const btnText = showNewBlogForm ? 'Cancel' : 'Add new blog'

  const handleToggleNewBlogForm = event => {
    event.preventDefault()
    setShowNewBlogForm(!showNewBlogForm)
  }

  const handleNewBlogChange = e => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value })
  }

  const addNewBlog = event => {
    event.preventDefault()
    dispatch(addBlog(user, newBlog))
    setNewBlog({ title: '', author: '', url: '' })
    setShowNewBlogForm(false)
  }
  return user
    ? (
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
    : null
}

export default NewBlog