const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_NOTIF':
      return action.data
    case 'DEL_NOTIF':
      return null
    default:
      return state
  }
}

export const setNotification = notification => {
  return {
    type: 'SET_NOTIF',
    data: notification
  }
}

export const delNotification = () => {
  return {
    type: 'DEL_NOTIF',
    data: null
  }
}

export default notificationReducer