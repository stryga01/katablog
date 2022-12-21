import React from 'react'
import { Link } from 'react-router-dom'

import Avatar from '../Avatar/Avatar'

import s from './Header.module.scss'

const Header = (props) => {
  const { setCurrentPage, isLogin, logOut, user } = props
  const { username, image } = user

  return (
    <header className={s.header}>
      <div className={s.container}>
        <h1 className={s.header__title}>
          <Link to="/articles">
            <span onClick={() => setCurrentPage(1)}>Kata Blog</span>
          </Link>
        </h1>
        <div className={s.header__info}>
          <Link to="/profile">
            <span className={s.header__username}>{username}</span>
          </Link>
          {isLogin && <Avatar currentUser={true} image={image} />}
          <div className={s.header__actions}>
            {!isLogin && (
              <button className={s.header__btn}>
                <Link to="/sign-in">Sign In</Link>
              </button>
            )}
            {!isLogin ? (
              <button className={s.header__btn}>
                <Link to="/sign-up">Sign Up</Link>
              </button>
            ) : (
              <button className={`${s.header__btn} ${s.header__btn_grey}`} onClick={logOut}>
                <Link to="/articles">Log Out</Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
