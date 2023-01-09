const initialState = {
  currentUser: {},
  isLoggedIn: !!localStorage.getItem('token'),
  token: localStorage.getItem('token'),
}

export const UserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_CURRENT_USER': {
      return {
        ...state,
        currentUser: { ...payload },
      }
    }
    case 'LOG_OUT': {
      return { ...state, isLoggedIn: false, currentUser: {}, token: '' }
    }
    case 'SIGN_IN': {
      return { ...state, token: payload, isLoggedIn: true }
    }
    default: {
      return { ...state }
    }
  }
}
