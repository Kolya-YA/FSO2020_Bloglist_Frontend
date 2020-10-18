import React from 'react'
import './styles.css'

const TopNotification = ({ text, error }) => (

  <section className={`notification ${error ? 'notification--error': ''}`}>
    {text}
  </section>
)

export default TopNotification