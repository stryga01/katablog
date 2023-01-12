import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/ArticlesAction'
import Avatar from '../Avatar/Avatar'

import s from './Header.module.scss'

const Header = (props) => {
  const { isLoggedIn, currentUser, logOutAction, setCurrentPage, currentPage, setLoadingAction } = props

  const location = useLocation()
  const logOut = () => {
    localStorage.removeItem('token')
    logOutAction()
    setLoadingAction()
  }

  return (
    <header className={s.header}>
      <div className={s.container}>
        <h1
          className={s.header__title}
          onClick={() => {
            currentPage !== 1 || location.pathname !== '/articles' ? setCurrentPage(1) : null
          }}
        >
          <Link to="/articles">
            <span>Kata Blog</span>
          </Link>
        </h1>
        <div className={s.header__info}>
          {isLoggedIn ? (
            <Link to="/new-article">
              <span className={`${s.header__btn} ${s.header__btn_create}`}>Create article</span>
            </Link>
          ) : null}

          <Link to="/profile">
            <span className={s.header__username}>{currentUser?.username}</span>
          </Link>
          {isLoggedIn && <Avatar currentUser={true} image={currentUser?.image} />}
          <div className={s.header__actions}>
            {!isLoggedIn && (
              <button className={s.header__btn}>
                <Link to="/sign-in">Sign In</Link>
              </button>
            )}
            {!isLoggedIn ? (
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

const mapStateToProps = ({ articles }) => {
  return {
    currentPage: articles.currentPage,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { setCurrentPage, setLoadingAction } = bindActionCreators(actions, dispatch)
  return {
    setCurrentPage,
    setLoadingAction,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
