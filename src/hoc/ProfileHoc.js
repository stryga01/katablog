import React, { useMemo } from 'react'
import { connect } from 'react-redux'

import Profile from '../copmponents/pages/Profile/Profile'
import Spinner from '../copmponents/Spinner/Spinner'

const ProfileHoc = ({ currentUser }) => {
  const defaultValues = useMemo(() => {
    if (!currentUser) {
      return null
    }
    return {
      username: currentUser.username,
      email: currentUser.email,
      image: currentUser.image,
    }
  }, [currentUser])

  return defaultValues ? <Profile defaultValues={defaultValues} /> : <Spinner styles />
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  }
}

export default connect(mapStateToProps)(ProfileHoc)
