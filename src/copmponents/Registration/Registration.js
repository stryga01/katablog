import React from 'react'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Input from '../Input/Input'
import ServiceBlog from '../../serviceBlog/ServiceBlog'
import * as actions from '../../store/actions/UserActions'

import s from './Registration.module.scss'

const Registration = (props) => {
  const { registerUser } = new ServiceBlog()
  const { state } = useLocation()
  const history = useHistory()
  const { signInAction, isLoggedIn } = props
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
        signInAction(user.token)
        localStorage.setItem('token', user.token)
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

  if (isLoggedIn) {
    return <Redirect to={state?.from || '/'} />
  }
  return (
    <form className={s.registration} onSubmit={handleSubmit(onSubmit)}>
      <h1>Create new account</h1>
      <ul className={s.registration__list}>
        <li className={s.registration__item}>
          <Input
            errors={errors}
            setting={{ name: 'username', type: 'text', label: 'Username', placeholder: 'Username' }}
            register={{
              ...register('username', {
                required: 'Поле обязательно к заполнению',
                minLength: {
                  value: 3,
                  message: 'Длина от 3 до 20 символов',
                },
                maxLength: {
                  value: 20,
                  message: 'Длина от 3 до 20 символов',
                },
              }),
            }}
          />
        </li>
        <li className={s.registration__item}>
          <Input
            errors={errors}
            setting={{ type: 'email', name: 'email', label: 'Email address', placeholder: 'Email address' }}
            register={{
              ...register('email', {
                required: 'Поле обязательно к заполнению',
                pattern: {
                  value: /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
                  message: 'Некорректный email',
                },
              }),
            }}
          />
        </li>
        <li className={s.registration__item}>
          <Input
            errors={errors}
            setting={{ type: 'password', name: 'password', label: 'Password', placeholder: 'Password' }}
            register={{
              ...register('password', {
                required: 'Поле обязательно к заполнению',
                minLength: {
                  value: 6,
                  message: 'Длина пароля должна быть от 6 до 40 символов',
                },
                maxLength: {
                  value: 40,
                  message: 'Длина пароля должна быть от 6 до 40 символов',
                },
              }),
            }}
          />
        </li>
        <li className={s.registration__item}>
          <Input
            errors={errors}
            setting={{
              type: 'password',
              name: 'confirmPassword',
              label: 'Repeat Password',
              placeholder: 'Repeat Password',
            }}
            register={{
              ...register('confirmPassword', {
                required: true,
                validate: (value) => {
                  return value === passwordValue || 'Пароли не совпадают'
                },
              }),
            }}
          />
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

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { signInAction } = bindActionCreators(actions, dispatch)
  return {
    signInAction,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
