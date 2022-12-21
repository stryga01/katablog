import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import ServiceBlog from '../../serviceBlog/ServiceBlog'

import s from './Registration.module.scss'

const Registration = ({ history, setIsLogin, setUser }) => {
  const { registerUser } = new ServiceBlog()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    setError,
  } = useForm({ mode: 'onBlur' })

  const passwordValue = watch('password')

  const onSubmit = (data) => {
    registerUser(data)
      .then(({ user }) => {
        localStorage.setItem('token', user.token)
        setUser(user)
        setIsLogin(true)
        history.push('/articles')
      })
      .catch(({ errors }) => {
        if (errors.username) {
          setError('username', { type: 'custom', message: 'Пользователь с таким именем уже зарагестрирован' })
        }
        if (errors.email) {
          setError('email', { type: 'custom', message: 'Email уже зарегестрирован' })
        }
      })
  }
  const { username, email, password, confirmPassword } = errors
  return (
    <form className={s.registration} onSubmit={handleSubmit(onSubmit)}>
      <h1>Create new account</h1>
      <ul className={s.registration__list}>
        <li className={s.registration__item}>
          <label className={s.registration__label} htmlFor="username">
            Username
          </label>
          <input
            {...register('username', {
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 3,
                message: 'Длина от 3 до 20 символов',
              },
              maxLength: {
                value: 20,
                message: 'Длина от 3 до 20 символов',
              },
            })}
            placeholder="Username"
            id="username"
            className={`${s.registration__input} ${username && s.registration__input_error}`}
          />
          {username && <span className={s.registration__error}>{username.message}</span>}
        </li>
        <li className={s.registration__item}>
          <label className={s.registration__label} htmlFor="email">
            Email address
          </label>
          <input
            {...register('email', {
              required: 'Поле обязательно к заполнению',
              pattern: {
                value: /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
                message: 'Некорректный email',
              },
            })}
            placeholder="Email address"
            className={`${s.registration__input} ${email && s.registration__input_error}`}
            type="email"
            id="email"
          />
          {email && <span className={s.registration__error}>{email.message}</span>}
        </li>
        <li className={s.registration__item}>
          <label className={s.registration__label} htmlFor="password">
            Password
          </label>
          <input
            {...register('password', {
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 6,
                message: 'Длина пароля должна быть от 6 до 40 символов',
              },
              maxLength: {
                value: 40,
                message: 'Длина пароля должна быть от 6 до 40 символов',
              },
            })}
            placeholder="Password"
            className={`${s.registration__input} ${password && s.registration__input_error}`}
            id="password"
            type="password"
          />
          {password && <span className={s.registration__error}>{password.message}</span>}
        </li>
        <li className={s.registration__item}>
          <label className={s.registration__label} htmlFor="repeatPassword">
            Repeat Password
          </label>
          <input
            {...register('confirmPassword', {
              required: true,
              validate: (value) => {
                return value === passwordValue || 'Пароли не совпадают'
              },
            })}
            placeholder="Repeat Password"
            className={`${s.registration__input} ${confirmPassword ? s.registration__input_error : null}`}
            id="repeatPassword"
            type="password"
          />
          {confirmPassword ? <span className={s.registration__error}>{confirmPassword.message}</span> : null}
        </li>
      </ul>
      <div className={s.registration__personal}>
        <input
          {...register('checkbox', {
            required: true,
          })}
          className={s.registration__checkbox}
          id="personal"
          type="checkbox"
        />
        <label className={`${s.registration__label} ${s.registration__personalColor}`} htmlFor="personal">
          I agree to the processing of my personal information
        </label>
      </div>
      <div className={s.registration__action}>
        <input disabled={!isValid} type="submit" value="Create" className={s.registration__submit} />

        <span className={s.registration__signIn}>
          Already have an account?
          <Link to="/sign-in">
            <span className={s.registration__signIn_color}>Sign In</span>
          </Link>
        </span>
      </div>
    </form>
  )
}

export default Registration
