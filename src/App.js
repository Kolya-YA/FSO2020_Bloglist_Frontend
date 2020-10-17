import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ login, password })
      console.log('2User ', user)
      setUser(user)
      setLogin('')
      setPassword('')
    } catch (exeption) {
      console.log('Catched error', exeption)
    }
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
      {user &&
        <div>
          <h2>Blogs list</h2>
          <p><strong>{user.name}</strong> logged in</p>
          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App