import React from 'react'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ServiceBlog from '../../serviceBlog/ServiceBlog'
import Input from '../Input/Input'
import * as userActions from '../../store/actions/UserActions'
import * as articleActions from '../../store/actions/ArticlesAction'

import s from './Authorization.module.scss'

const Authorization = (props) => {
  const { authorizationUser } = new ServiceBlog()
  const { state } = useLocation()
  const history = useHistory()
  const { signInAction, isLoggedIn, setLoadingAction } = props
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({ mode: 'onBlur' })

  const onSubmit = (data) => {
    authorizationUser(data)
      .then(({ user }) => {
        signInAction(user.token)
        setLoadingAction()
        localStorage.setItem('token', user.token)
        history.push('/articles')
      })
      .catch(() => {
        setError('email', { type: 'invalid', message: 'email or password is invalid' })
      })
  }

  if (isLoggedIn) {
    return <Redirect to={state?.from || '/'} />
  }

  return (
    <form className={s.auth} onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign In</h1>
      <ul className={s.auth__list}>
        <li className={s.auth__item}>
          <Input
            errors={errors}
            setting={{ type: 'text', name: 'email', label: 'Email address', placeholder: 'Email address' }}
            register={{
              ...register('email', {
                required: 'Поле не должно быть пустым',
                pattern: {
                  value: /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
                  message: 'Некорректный email',
                },
              }),
            }}
          />
        </li>
        <li className={s.auth__item}>
          <Input
            errors={errors}
            setting={{ type: 'password', name: 'password', label: 'Password', placeholder: 'Password' }}
            register={{
              ...register('password', {
                required: 'Поле не должно быть пустым',
              }),
            }}
          />
        </li>
      </ul>
      <div className={s.auth__action}>
        <input className={s.auth__submit} type="submit" />
        <span className={s.auth__signUp}>
          Don’t have an account?
          <Link to="/sign-up">
            <span className={s.auth__signUp_color}>Sign Up</span>
          </Link>
          .
        </span>
      </div>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  const actions = { ...userActions, ...articleActions }
  const { signInAction, setLoadingAction } = bindActionCreators(actions, dispatch)
  return {
    signInAction,
    setLoadingAction,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authorization)
