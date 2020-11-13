import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, userLogout } from '../reducers/userReducer'
import LoginForm from './LoginForm'

const UserLogin = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [dispatch])

  const Logged = () => {
    const handleLogout = event => {
      event.preventDefault()
      localStorage.removeItem('loggedUser')
      dispatch(userLogout(user))
    }

    return (
      <section>
        <strong>{user.name}</strong> logged in. <button onClick={handleLogout}>Logout</button>
      </section>
    )
  }

  return user
    ? (<Logged />)
    : (<LoginForm setUSer={setUser} />)
}

export default UserLogin