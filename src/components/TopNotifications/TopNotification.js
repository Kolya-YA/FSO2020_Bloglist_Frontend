import React from 'react'
import PropTypes from 'prop-types'
import './styles.css'

const TopNotification = ({ text, error }) => (

  <section className={`notification ${error ? 'notification--error': ''}`}>
    {text}
  </section>
)

TopNotification.propTypes = {
  text: PropTypes.string.isRequired,
  error: PropTypes.bool
}

export default TopNotification