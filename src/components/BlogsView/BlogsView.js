import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import BlogListItem from '../BlogListItem/BlogListItem'
import { BlogViewList } from './BlogView.styled'

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
      <BlogViewList className='blogList'>
        {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
          <BlogListItem
            key={blog.id}
            blog={blog}
          />
        )}
      </BlogViewList>
    </section>
  )
}

export default BlogView