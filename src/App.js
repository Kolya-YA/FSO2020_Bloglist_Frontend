import React, { useState, useEffect } from 'react'
import './App.css'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import TopNotifications from './components/TopNotifications/TopNotification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [login, setLogin] = useState('pupkine-1@example.com')
  const [password, setPassword] = useState('123pupkine1')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ text: '', error: false })

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const addNotification = (text, time = 5000, error = false) => {
    setNotification({ text, error })
    setTimeout(() => {
      setNotification([])
    }, time)
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ login, password })
      localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setLogin('')
      setPassword('')
      addNotification(`${user.name} is logged in`, 2000)
    } catch (exeption) {
      const res = exeption.response
      const errMsg = `Error: ${res.status} ${res.statusText}. ${res.data.error}.`
      addNotification(errMsg, 10000, true)
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    localStorage.removeItem('loggedUser')
    addNotification(`${user.name} is logged out`)
    setUser(null)
  }

  const createNewBlog = async newBlog => {
    try {
      const addedNewBlog = await blogService.addNewBlog(user.token, newBlog)
      setBlogs(blogs.concat(addedNewBlog))
      addNotification(`A new blog ${addedNewBlog.title} by ${addedNewBlog.author} added`)
    } catch (exeption) {
      const res = exeption.response
      console.error('Catched error response (create): ', res)
      const errMsg = `Error: ${res.status} ${res.statusText}. ${res.data.name}. ${res.data.message}.`
      addNotification(errMsg, 10000, true)
    }
  }

  const updateBlog = async (id, updatedBlog) => {
    try {
      const updatingBlog = await blogService.updateBlog(id, updatedBlog)
      const otherBlogs = blogs.filter(b => b.id !== id)
      setBlogs(otherBlogs.concat(updatingBlog))
      addNotification(`Blog ${updatingBlog.title} updated`)
    } catch (exeption) {
      const res = exeption.response
      console.error('Catched error response (update): ', res)
      const errMsg = `Error: ${res.status} ${res.statusText}. ${res.data.name}. ${res.data.message}.`
      addNotification(errMsg, 10000, true)
    }
  }

  const deleteBlog = async blog => {
    try {
      await blogService.deleteBlog(blog.id, user.token)
      const otherBlogs = blogs.filter(b => b.id !== blog.id)
      setBlogs(otherBlogs)
      addNotification(`Blog ${blog.title} deleted`)
    } catch (exeption) {
      const res = exeption.response
      console.error('Catched error resoponse (delete): ', res)
      const errMsg = `Error: ${res.status} ${res.statusText}. ${res.data.name}. ${res.data.message}.`
      addNotification(errMsg, 10000, true)
    }
  }

  return (
    <div>
      <h2>Blogs</h2>
      { notification.text &&
        <TopNotifications
          text={notification.text}
          error={notification.error}
        />
      }
      { !user &&
        <LoginForm
          login={login}
          setLogin={setLogin}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      }
      { user &&
        <div>
          <div>
            <strong>{user.name}</strong> logged in. <button onClick={handleLogout}>Logout</button>
          </div>
          <NewBlog
            createNewBlog={createNewBlog}
          />
          <h3>Blogs list</h3>
          <ul className='blogList'>
            {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
              />
            )}
          </ul>
        </div>
      }
    </div>
  )
}

export default App