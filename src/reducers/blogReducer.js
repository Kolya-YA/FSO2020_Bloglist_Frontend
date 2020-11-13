import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'ADD_BLOG':
      return state.concat(action.data)
    case 'UPDATE_BLOG': {
      const otherBlogs = state.filter(b => b.id !== action.data.id)
      return otherBlogs.concat(action.data)
    }
    case 'DEL_BLOG':
      return state.filter(b => b.id !== action.data)
    default:
      return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const updateBlog = blog => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.updateBlog(blog)
      dispatch({
        type: 'UPDATE_BLOG',
        data: updatedBlog
      })
      dispatch(setNotification(`Blog ${updatedBlog.title} has been updated`))
    } catch (error) {
      const res = error.response
      const errMsg = `Error: ${res.status} ${res.statusText}. ${res.data.name}. ${res.data.message}.`
      dispatch(setNotification(errMsg, true, 10000))
    }
  }
}

export const deleteBlog = (blog, token) => {
  return async dispatch => {
    try {
      await blogService.deleteBlog(blog.id, token)
      dispatch ({
        type: 'DEL_BLOG',
        data: blog.id
      })
      dispatch(setNotification(`Blog ${blog.title} has been deleted`))
    } catch (exeption) {
      const res = exeption.response
      console.error('Catched error resoponse (delete): ', res)
      const errMsg = `Error: ${res.status} ${res.statusText}. ${res.data.name}. ${res.data.message}.`
      dispatch(setNotification(errMsg, true, 10000))
    }
  }
}

export const addBlog = (user, newBlog) => {
  return async dispatch => {
    try {
      const addedNewBlog = await blogService.addNewBlog(user.token, newBlog)
      dispatch({
        type: 'ADD_BLOG',
        data: addedNewBlog
      })
      dispatch(setNotification(`A new blog ${addedNewBlog.title} by ${addedNewBlog.author} added`))
    } catch (exeption) {
      const res = exeption.response
      console.error('Catched error response (create): ', res)
      const errMsg = `Error: ${res.status} ${res.statusText}. ${res.data.name}. ${res.data.message}.`
      dispatch(setNotification(errMsg, true, 10000))
    }
  }
}

export default blogReducer