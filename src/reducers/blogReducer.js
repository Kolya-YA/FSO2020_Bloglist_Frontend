import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOGS':
      return action.data
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

// const updateBlog = async (id, updatedBlog) => {
//   try {
//     const updatingBlog = await blogService.updateBlog(id, updatedBlog)
//     const otherBlogs = blogs.filter(b => b.id !== id)
//     // setBlogs(otherBlogs.concat(updatingBlog))
//     addNotification(`Blog ${updatingBlog.title} updated`)
//   } catch (exeption) {
//     const res = exeption.response
//     console.error('Catched error response (update): ', res)
//     const errMsg = `Error: ${res.status} ${res.statusText}. ${res.data.name}. ${res.data.message}.`
//     addNotification(errMsg, 10000, true)
//   }
// }

// const deleteBlog = async blog => {
//   try {
//     await blogService.deleteBlog(blog.id, user.token)
//     const otherBlogs = blogs.filter(b => b.id !== blog.id)
//     // setBlogs(otherBlogs)
//     addNotification(`Blog ${blog.title} deleted`)
//   } catch (exeption) {
//     const res = exeption.response
//     console.error('Catched error resoponse (delete): ', res)
//     const errMsg = `Error: ${res.status} ${res.statusText}. ${res.data.name}. ${res.data.message}.`
//     addNotification(errMsg, 10000, true)
//   }
// }

export default blogReducer