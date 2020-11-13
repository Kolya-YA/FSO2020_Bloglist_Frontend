import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { initBlogs } from './reducers/blogReducer'

import './App.css'
import TopNotifications from './components/TopNotifications/TopNotification'
import UserLogin from './components/UserLogin'
import NewBlog from './components/NewBlog'
import BlogsView from './components/BlogsView'
import UsersView from './components/UsersView'
import SingeBlog from './components/SingleBlog'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  return (
    <div>
      <TopNotifications />
      <UserLogin />
      <h2>Blogs</h2>
      <NewBlog />
      <Switch>
        <Route path='/users/:id'>
          <BlogsView />
        </Route>
        <Route path='/users'>
          <UsersView />
        </Route>
        <Route path='/blogs/:id'>
          <SingeBlog />
        </Route>
        <Route path='/'>
          <BlogsView />
        </Route>
      </Switch>
    </div>
  )
}

export default App