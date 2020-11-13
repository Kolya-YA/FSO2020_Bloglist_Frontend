import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { userLogin } from '../reducers/userReducer'

const LoginForm = () => {

  const [login, setLogin] = useState('pupkine-1@example.com')
  const [password, setPassword] = useState('123pupkine1')

  const dispatch = useDispatch()

  const handleLogin = async event => {
    event.preventDefault()
    const credential = {
      login: event.target.login.value,
      password: event.target.password.value
    }
    dispatch(userLogin(credential))
  }

  return (
    <>
      <h2>Login to Bloglist application</h2>
      <form onSubmit={handleLogin}>
        <label>Login (e-mail):
          <input
            type='text'
            required
            value={login}
            name='login'
            onChange={({ target }) => setLogin(target.value)}
          />
        </label>
        <br/>
        <label>Password:
          <input
            type='password'
            required
            value={password}
            name='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <br />
        <button type='submit'>Login</button>
      </form>
    </>
  )
}

export default LoginForm