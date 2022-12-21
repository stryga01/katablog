import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import noAvatar from '../../assets/img/no-avatar.jpg'

import s from './Avatar.module.scss'

const Avatar = ({ image, currentUser }) => {
  const [imageLoaded, setImageLoaded] = useState(true)
  return (
    <div>
      {currentUser ? (
        <Link to="/profile">
          <img
            className={s.avatar}
            onError={() => setImageLoaded(false)}
            src={!image ? noAvatar : imageLoaded ? image : noAvatar}
            alt="no-avatar"
            height="50"
            width="50"
          />
        </Link>
      ) : (
        <img
          className={s.avatar}
          onError={() => setImageLoaded(false)}
          src={!image ? noAvatar : imageLoaded ? image : noAvatar}
          alt="no-avatar"
          height="50"
          width="50"
        />
      )}
    </div>
  )
}

export default Avatar
