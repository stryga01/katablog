import { GET_CURRENT_USER, LOG_OUT, SET_IS_LOGGED_IN, SET_TOKEN, SIGN_IN } from '../reduxTypes'

const initialState = {
  currentUser: null,
  isLoggedIn: false,
  token: '',
}

export const UserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CURRENT_USER: {
      return {
        ...state,
        currentUser: { ...payload },
      }
    }
    case LOG_OUT: {
      return { ...state, isLoggedIn: false, currentUser: {}, token: '' }
    }
    case SIGN_IN: {
      return { ...state, token: payload, isLoggedIn: true }
    }

    case SET_TOKEN: {
      return { ...state, token: payload }
    }

    case SET_IS_LOGGED_IN: {
      return { ...state, isLoggedIn: true }
    }
    default: {
      return { ...state }
    }
  }
}
