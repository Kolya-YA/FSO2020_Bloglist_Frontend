import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch(action.type) {
    case 'USER_LOGIN':
      return action.data
    case 'USER_LOGOUT':
      return null
    default:
      return state
  }
}

export const setUser = user => {
  return {
    type: 'USER_LOGIN',
    data: user
  }
}

export const userLogin = credentials => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch({
        type: 'USER_LOGIN',
        data: user
      })
      dispatch(setNotification(`${user.name} is logged in`, false, 2000))
    } catch (error) {
      const res = error.response
      const errMsg = `Error: ${res.status} ${res.statusText}. ${res.data.error}.`
      dispatch(setNotification(errMsg, true, 10000))
    }
  }
}

export const userLogout = user => {
  localStorage.removeItem('loggedUser')
  return dispatch => {
    dispatch({
      type: 'USER_LOGOUT'
    })
    dispatch(setNotification(`${user.name} is logged out`))
  }
}

export default userReducer