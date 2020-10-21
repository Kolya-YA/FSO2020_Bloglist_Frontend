import React, { useState } from 'react'


const Blog = ({ blog, updateBlog }) => {
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
  
  return (
  <li className='blogList__item'>
    <div>
      Title: <strong>{blog.title}</strong> 
      <button onClick={toogleView}>
        Show {fullView ? 'less' : 'more'}
      </button>
    </div>
    <div style={{display: fullView || 'none'}}>
      URL: <strong>{blog.url}</strong><br />
      Likes: <strong>{blog.likes}</strong> <button onClick={likePlusHandler}>Like +</button><br /> 
      Author: {blog.author}<br />
    </div>
  </li>
)}

export default Blog
