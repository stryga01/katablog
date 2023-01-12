import React from 'react'
import { useForm } from 'react-hook-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ServiceBlog from '../../../serviceBlog/ServiceBlog'
import Input from '../../Input/Input'
import * as actions from '../../../store/actions/UserActions'

import s from './Profile.module.scss'

const Profile = (props) => {
  const { signInAction } = props
  const { updateCurrentUser } = new ServiceBlog()

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      ...props?.defaultValues,
    },
  })

  const onSubmit = (data) => {
    const token = localStorage.getItem('token')
    updateCurrentUser(data, token)
      .then(({ user }) => {
        signInAction(user.token)
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
  return (
    <form className={s.profile} onSubmit={handleSubmit(onSubmit)}>
      <h1>Edit Profile</h1>
      <ul className={s.profile__list}>
        <li className={s.profile__item}>
          <Input
            errors={errors}
            register={{
              ...register('username', {
                required: 'Поле обязательно к заполнению',
              }),
            }}
            setting={{ name: 'username', type: 'text', placeholder: 'Username', label: 'Username' }}
          />
        </li>
        <li className={s.profile__item}>
          <Input
            errors={errors}
            setting={{ name: 'email', label: 'Email address', placeholder: 'Email', type: 'email' }}
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
        <li className={s.profile__item}>
          <Input
            errors={errors}
            setting={{
              type: 'password',
              label: 'New password',
              placeholder: 'New password',
              name: 'password',
              autocomplete: 'off',
            }}
            register={{
              ...register('password', {
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
        <li className={s.profile__item}>
          <Input
            errors={errors}
            setting={{ name: 'image', label: 'Avatar image (url)', placeholder: 'Image url', type: 'text' }}
            register={{
              ...register('image', {
                pattern: {
                  value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                  message: 'Некорректный url-адрес',
                },
              }),
            }}
          />
        </li>
      </ul>
      <input className={s.profile__submit} value="Save" type="submit" />
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { signInAction } = bindActionCreators(actions, dispatch)
  return {
    signInAction,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
