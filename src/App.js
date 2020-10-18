import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [login, setLogin] = useState('pupkine-1@example.com')
  const [password, setPassword] = useState('123pupkine1')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ login, password })
      localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setLogin('')
      setPassword('')
    } catch (exeption) {
      console.log('Catched error', exeption)
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    localStorage.removeItem('loggedUser')
    setUser(null)
  }

  console.log('Logged User: ', user)

  return (
    <div>
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
          <h2>Blogs list</h2>
          <p>
            <strong>{user.name}</strong> logged in 
            <button onClick={handleLogout}>
              Logout
            </button>
          </p>
          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App