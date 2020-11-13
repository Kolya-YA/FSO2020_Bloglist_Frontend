import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { deleteBlog, updateBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [fullView, setFullView] = useState(false)
  const user = useSelector(({ user }) => user)
  const toogleView = event => {
    event.preventDefault()
    setFullView(!fullView)
  }

  const likePlusHandler = event => {
    event.preventDefault()
    const updatedBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1
    }
    dispatch(updateBlog(updatedBlog))
  }

  const showDelButton = blog.user.name === user?.name

  const hadnlerDelButton = event => {
    event.preventDefault()
    const delMsg = `Do you realy want to delete blog "${blog.title}" by "${blog.user.name}"`
    if (window.confirm(delMsg)) dispatch(deleteBlog(blog, user.token))
  }

  return (
    <li className='blogList__item'>
      <div>
        Title: <strong>{blog.title} </strong>
        <button onClick={toogleView}>
          Show {fullView ? 'less' : 'more'}
        </button>
      </div>
      {fullView && <div style={{ display: fullView || 'none2' }}>
        URL: <strong>{blog.url}</strong><br />
        Likes: <strong data-cy="likes-qty">{blog.likes}</strong> <button data-cy="like-btn" onClick={likePlusHandler}>Like +</button><br />
        Author: {blog.author}<br />
        {showDelButton && <button onClick={hadnlerDelButton}>Delete</button>}
      </div>}
    </li>
  )}

export default Blog
