import React from 'react'
import { format } from 'date-fns'

import Avatar from '../Avatar/Avatar'

import s from './Author.module.scss'

const Author = ({ author, createdAt, updatedAt }) => {
  const { image, username } = author
  return (
    <div className={s.author}>
      <div className={s.author__info}>
        <span className={s.author__name}>{username}</span>
        <span className={s.author__date}>
          {updatedAt ? format(new Date(updatedAt), 'MMMM i, yyyy') : format(new Date(createdAt), 'MMMM i, yyyy')}
        </span>
      </div>
      <Avatar currentUser={false} image={image} />
    </div>
  )
}
export default Author
