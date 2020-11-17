import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { deleteBlog, updateBlog } from '../../reducers/blogReducer'
import { BlogLI } from './BlogListItem.styled'

const BlogListItem = ({ blog }) => {
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
    <BlogLI>
      <div className='blog-list-item__top'>
        <strong><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></strong>
        <button onClick={toogleView}>
          Show {fullView ? 'less' : 'more'}
        </button>
      </div>
      {fullView && <div className='blog-list-item__bottom'>
        URL: <strong>{blog.url}</strong><br />
        Likes: <strong data-cy="likes-qty">{blog.likes}</strong> <button data-cy="like-btn" onClick={likePlusHandler}>Like +</button><br />
        Author: {blog.author}<br />
        Comments: <strong>{blog.comments.length}</strong>
        {showDelButton && <button onClick={hadnlerDelButton}>Delete</button>}
      </div>}
    </BlogLI>
  )}

export default BlogListItem
