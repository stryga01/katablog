import ServiceBlog from '../../serviceBlog/ServiceBlog'
import * as types from '../reduxTypes'
import { SET_IS_LOGGED_IN, SET_TOKEN } from '../reduxTypes'

const { getCurrentUser } = new ServiceBlog()
const { GET_CURRENT_USER, LOG_OUT, SIGN_IN } = types

export const getCurrentUserAction = (token) => {
  return async (dispatch) => {
    getCurrentUser(token).then((res) => {
      if (res?.errors?.error?.status === 401) {
        localStorage.removeItem('token')
        dispatch(logOutAction())
        return
      }
      dispatch({ type: GET_CURRENT_USER, payload: res.user })
    })
  }
}

export const logOutAction = () => {
  return { type: LOG_OUT }
}

export const signInAction = (token) => {
  return { type: SIGN_IN, payload: token }
}

export const setToken = (token) => {
  return { type: SET_TOKEN, payload: token }
}

export const setIsLoggedIn = (bool) => {
  return { type: SET_IS_LOGGED_IN, payload: bool }
}
