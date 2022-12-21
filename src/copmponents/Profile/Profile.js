/*eslint-disable*/
import React from 'react'
import { useForm } from 'react-hook-form'
import ServiceBlog from '../../serviceBlog/ServiceBlog'

import s from './Profile.module.scss'

const Profile = ({ history, setUser }) => {
  const { updateCurrentUser } = new ServiceBlog()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setError,
  } = useForm({ mode: 'onBlur' })

  const onSubmit = (data) => {
    const token = localStorage.getItem('token')
    updateCurrentUser(data, token)
      .then(({ user }) => {
        setUser(user)
        reset()
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

  const { username, email, password, image } = errors
  return (
    <form className={s.profile} onSubmit={handleSubmit(onSubmit)}>
      <h1>Edit Profile</h1>
      <ul className={s.profile__list}>
        <li className={s.profile__item}>
          <label className={s.profile__label} htmlFor="username">
            Username
          </label>
          <input
            {...register('username', {
              required: 'Поле обязательно к заполнению',
            })}
            className={`${s.profile__input} ${username && s.profile__input_error}`}
            id="username"
            type="text"
            placeholder="Username"
          />
          {username && <span className={s.profile__error}>{username.message}</span>}
        </li>
        <li className={s.profile__item}>
          <label className={s.profile__label} htmlFor="email">
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
            className={`${s.profile__input} ${email && s.profile__input_error}`}
            id="email"
            type="email"
            placeholder="Email"
          />
        </li>
        {email && <span className={s.profile__error}>{email.message}</span>}
        <li className={s.profile__item}>
          <label className={s.profile__label} htmlFor="password">
            New password
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
            className={`${s.profile__input} ${password && s.profile__input_error}`}
            id="password"
            type="password"
            placeholder="New password"
            autoComplete="new-password"
          />
          {password && <span className={s.profile__error}>{password.message}</span>}
        </li>
        <li className={s.profile__item}>
          <label className={s.profile__label} htmlFor="imageUrl">
            Avatar image (url)
          </label>
          <input
            {...register('image', {
              pattern: {
                value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                message: 'Некорректный url-адрес',
              },
            })}
            className={`${s.profile__input} ${image && s.profile__input_error}`}
            id="image"
            type="text"
            placeholder="Image url"
          />
          {image && <span className={s.profile__error}>{image.message}</span>}
        </li>
      </ul>
      <input className={s.profile__submit} value="Save" type="submit" />
    </form>
  )
}

export default Profile
