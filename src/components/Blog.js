import React from 'react'
const Blog = ({ blog }) => (
  <div>
    <cite>{blog.title}</cite> by {blog.author}
  </div>
)

export default Blog
