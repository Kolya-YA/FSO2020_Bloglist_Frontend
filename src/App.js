import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { initBlogs } from './reducers/blogReducer'

import TopNotifications from './components/TopNotifications/TopNotification'
import NewBlog from './components/NewBlog'
import BlogsView from './components/BlogsView/BlogsView'
import UsersView from './components/UsersView'
import SingeBlog from './components/SingleBlog'
import TopNav from './components/TopNav/TopNav'
import styled from 'styled-components'
import { setUser } from './reducers/userReducer'

const AppWraper = styled.div`
box-sizing: border-box;
font-family: 'Open Sans', 'sans-serif';
background-color: #fff;
color: #444;
max-width: 940px;
margin: 0 20px;
display: grid;
grid-gap: 10px;
`

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  return (
    <AppWraper>
      <TopNav />
      <TopNotifications />
      <NewBlog />
      <Switch>
        <Route path='/users/:id'>
          <BlogsView />
        </Route>
        <Route path='/usersview'>
          <UsersView />
        </Route>
        <Route path='/blogs/:id'>
          <SingeBlog />
        </Route>
        <Route path='/'>
          <BlogsView />
        </Route>
      </Switch>
    </AppWraper>
  )
}

export default App