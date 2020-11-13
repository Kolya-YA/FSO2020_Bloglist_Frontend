import React from 'react'
import { useSelector } from 'react-redux'

import Blog from './Blog'

const BlogView = () => {

  const blogs = useSelector(({ blogs }) => blogs)

  return (
    <section>
      <h3>Blogs list</h3>
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