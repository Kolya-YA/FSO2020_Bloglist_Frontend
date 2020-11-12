import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import './App.css'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import TopNotifications from './components/TopNotifications/TopNotification'
import blogService from './services/blogs'
import loginService from './services/login'

import { setNotification, delNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const [login, setLogin] = useState('pupkine-1@example.com')
  const [password, setPassword] = useState('123pupkine1')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const addNotification = (text, time = 5000, error = false) => {
    dispatch(setNotification({ text, error }))
    setTimeout(() => {
      dispatch(delNotification())
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
      // setBlogs(blogs.concat(addedNewBlog))
      addNotification(`A new blog ${addedNewBlog.title} by ${addedNewBlog.author} added`)
    } catch (exeption) {
      const res = exeption.response
      console.error('Catched error response (create): ', res)
      const errMsg = `Error: ${res.status} ${res.statusText}. ${res.data.name}. ${res.data.message}.`
      addNotification(errMsg, 10000, true)
    }
  }

  return (
    <div>
      <h2>Blogs</h2>
      <TopNotifications />
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
          <NewBlog createNewBlog={createNewBlog} />
          <BlogList />
        </div>
      }
    </div>
  )
}

export default App