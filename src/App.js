import React from 'react'

import './App.css'
import BlogList from './components/BlogList'
import UserLogin from './components/UserLogin'
import NewBlog from './components/NewBlog'
import TopNotifications from './components/TopNotifications/TopNotification'

const App = () => {

  return (
    <div>
      <h2>Blogs</h2>
      <TopNotifications />
      <UserLogin />
      <NewBlog />
      <BlogList />
    </div>
  )
}

export default App