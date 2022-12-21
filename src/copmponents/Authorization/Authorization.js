/*eslint-disable*/
import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import s from './Authorization.module.scss'
import ServiceBlog from '../../serviceBlog/ServiceBlog'

const Authorization = (props) => {
  const { authorizationUser } = new ServiceBlog()
  const { setUser, setIsLogin, history } = props

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setError,
  } = useForm({ mode: 'onBlur' })

  const onSubmit = (data) => {
    authorizationUser(data)
      .then(({ user }) => {
        setIsLogin(true)
        setUser(user)
        localStorage.setItem('token', user.token)
        history.push('/articles')
      })
      .catch(() => {
        setError('email', { type: 'invalid', message: 'email or password is invalid' })
      })
  }

  const { email, password } = errors

  return (
    <form className={s.auth} onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign In</h1>
      <ul className={s.auth__list}>
        <li className={s.auth__item}>
          <label className={s.auth__label} htmlFor="email">
            Email address
          </label>
          <input
            {...register('email', {
              required: 'Поле не должно быть пустым',
              pattern: {
                value: /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
                message: 'Некорректный email',
              },
            })}
            className={`${s.auth__input} ${email ? s.auth__input_error : null}`}
            type="email"
            placeholder="Email address"
            id="email"
          />
          {email ? <span className={s.auth__error}>{email.message}</span> : null}
        </li>
        <li className={s.auth__item}>
          <label className={s.auth__label} htmlFor="password">
            Password
          </label>
          <input
            {...register('password', {
              required: 'Поле не должно быть пустым',
            })}
            className={`${s.auth__input} ${password ? s.auth__input_error : null}`}
            type="password"
            placeholder="Password"
            id="password"
          />
          {password ? <span className={s.auth__error}>{password.message}</span> : null}
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

export default Authorization
