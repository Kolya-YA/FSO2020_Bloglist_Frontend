import React from 'react'
import { useSelector } from 'react-redux'

import './styles.css'

const TopNotification = () => {

  const notification = useSelector(state => state.notification)

  if(!notification) return null

  return (
    <section className={`notification ${notification.error ? 'notification--error': ''}`}>
      {notification.text}
    </section>
  )
}

export default TopNotification