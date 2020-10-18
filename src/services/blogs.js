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

export default { 
  getAll,
  addNewBlog,
}