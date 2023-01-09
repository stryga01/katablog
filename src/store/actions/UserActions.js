import ServiceBlog from '../../serviceBlog/ServiceBlog'

const { getCurrentUser } = new ServiceBlog()

export const getCurrentUserAction = (token) => {
  return async (dispatch) => {
    getCurrentUser(token).then(({ user }) => {
      dispatch({ type: 'GET_CURRENT_USER', payload: user })
    })
  }
}

export const logOutAction = () => {
  return { type: 'LOG_OUT' }
}

export const signInAction = (token) => {
  return { type: 'SIGN_IN', payload: token }
}
