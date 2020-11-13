import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Blog from './Blog'

const BlogView = () => {
  const userId = useParams().id
  const blogs = useSelector(({ blogs }) => {
    return userId
      ? blogs.filter(b => b.user.id === userId)
      : blogs
  })

  const blogListTitle = userId
    ? `${blogs[0]?.user.name}'s blog list`
    : 'Blog list'

  return (
    <section>
      <h3>{blogListTitle}</h3>
      <ul className='blogList'>
        {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
          />
        )}
      </ul>
    </section>
  )
}

export default BlogView