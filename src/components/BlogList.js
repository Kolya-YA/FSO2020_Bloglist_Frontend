import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { initBlogs } from '../reducers/blogReducer'
import Blog from '../components/Blog'

const BlogLIst = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])
  const blogs = useSelector(({ blogs }) => blogs)

  return (
    <section>
      <h3>Blogs list</h3>
      <ul className='blogList'>
        {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            // user={user}
            // updateBlog={updateBlog}
            // deleteBlog={deleteBlog}
          />
        )}
      </ul>
    </section>
  )
}

export default BlogLIst