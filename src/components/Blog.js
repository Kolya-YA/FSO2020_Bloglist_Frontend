import React, { useState } from 'react'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const [fullView, setFullView] = useState(false)

  const toogleView = event => {
    event.preventDefault()
    setFullView(!fullView)
  }

  const likePlusHandler = event => {
    event.preventDefault()
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    updateBlog(blog.id, updatedBlog)
  }

  const showDelButton = () => blog.user.name === user.name

  const hadlerDelButton = event => {
    event.preventDefault()
    const delMsg = `Do you realy want to delete blog "${blog.title}" by "${blog.user.name}"`
    if (window.confirm(delMsg)) deleteBlog(blog)
  }


  return (
    <li className='blogList__item'>
      <div>
        Title: <strong>{blog.title} </strong>
        <button onClick={toogleView}>
          Show {fullView ? 'less' : 'more'}
        </button>
      </div>
      <div style={{ display: fullView || 'none' }}>
        URL: <strong>{blog.url}</strong><br />
        Likes: <strong>{blog.likes}</strong> <button onClick={likePlusHandler}>Like +</button><br />
        Author: {blog.author}<br />
        {showDelButton() && <button onClick={hadlerDelButton}>Delete</button>}
      </div>
    </li>
  )}

export default Blog
