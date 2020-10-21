import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addNewBlog = async (token, newBlog) => {
  const response = await axios.post(
    baseUrl,
    newBlog,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}

const updateBlog = async (blogId, updatedBlog) => {
  const response = await axios.put(
    `${baseUrl}/${blogId}`,
    updatedBlog
  )
  return response.data
}

export default { 
  getAll,
  addNewBlog,
  updateBlog,
}