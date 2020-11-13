import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { initBlogs } from './reducers/blogReducer'

import './App.css'
import TopNotifications from './components/TopNotifications/TopNotification'
import UserLogin from './components/UserLogin'
import NewBlog from './components/NewBlog'
import BlogView from './components/BlogView'
import UserView from './components/UsersView'

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
        <Route path='/users'>
          <UserView />
        </Route>
        <Route path='/'>
          <BlogView />
        </Route>
      </Switch>
    </div>
  )
}

export default App