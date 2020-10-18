import React from 'react'

const LoginForm = props => {
  const {
    login,
    password,
    setLogin,
    setPassword,
    handleLogin,
  } = props

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