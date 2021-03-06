import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { updateBlog } from '../reducers/blogReducer'


const SingeBlog = () => {
  const dispatch = useDispatch()
  const blogId = useParams().id
  const blog = useSelector(({ blogs }) => blogs.find(b => b.id === blogId))

  const likePlusHandler = event => {
    event.preventDefault()
    const updatedBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1
    }
    dispatch(updateBlog(updatedBlog))
  }

  const commentSubmitHandler = event => {
    event.preventDefault()
    const newComments = blog.comments.concat({ text: event.target.newComment.value })
    const updatedBlog = {
      ...blog,
      user: blog.user.id,
      comments: newComments
    }
    // console.log('NewB: ', updatedBlog)
    dispatch(updateBlog(updatedBlog))
  }

  return blog
    ? (
      <article>
        <h3>{blog.title}</h3>
        <p>Author: <strong>{blog.author}</strong></p>
        <p>Created by <strong>{blog.user.name}</strong></p>
        <p>Origin: <strong>{blog.url}</strong></p>
        <p>Likes: <strong>{blog.likes}</strong> <button data-cy="like-btn" onClick={likePlusHandler}>Like +</button></p>
        <p>Comments ({blog.comments.length}):</p>
        <form onSubmit={commentSubmitHandler}>
          <input name='newComment' type='text' max='1024' />
          <button> Add new comment</button>
        </form>
        <ul>
          {blog.comments.map(c => <li key={c._id}>{c.text}</li>)}
        </ul>
      </article>
    )
    : null
}

export default SingeBlog