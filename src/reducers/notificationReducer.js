const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_NOTIF':
      return action.data
    default:
      return state
  }
}

export const setNotification = (text, error = false, time = 5000) => {
  return dispatch => {
    dispatch({ type: 'SET_NOTIF', data: { text, error } })
    setTimeout(() => {
      dispatch({ type: 'SET_NOTIF', data: null })
    }, time)
  }
}

export default notificationReducer