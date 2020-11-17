import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { userLogout } from '../../reducers/userReducer'
import LoginForm from '../LoginForm'
import { TopNavBar, TopNavigation, StyledNavLink } from './TopNav.styled'

const TopNav = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

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

  return (
    <TopNavBar>
      <h2>Blogsapp</h2>
      <TopNavigation>
        <ul>
          <li>
            <StyledNavLink exact to={'/'}>Home</StyledNavLink>
          </li>
          <li>
            <StyledNavLink to={'/usersview'}>Users view</StyledNavLink>
          </li>
        </ul>
      </TopNavigation>
      {user ? <Logged /> : <LoginForm />}
    </TopNavBar>
  )
}

export default TopNav