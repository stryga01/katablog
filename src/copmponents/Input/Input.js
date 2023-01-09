import React from 'react'

import s from './Input.module.scss'

const Input = ({ setting, register, errors }) => {
  const { name, label, placeholder, type, autocomplete, textarea } = setting
  return (
    <>
      <label className={s.input__label} htmlFor={name}>
        {label}
      </label>
      {textarea ? (
        <textarea
          {...register}
          className={`${s.input__field} ${errors[name] && s.input__field_error}`}
          id={name}
          placeholder={placeholder}
          rows="6"
        />
      ) : (
        <input
          {...register}
          className={`${s.input__field} ${errors[name] && s.input__field_error}`}
          id={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autocomplete && 'new-password'}
        />
      )}

      {errors[name] && <span className={s.input__error}>{errors[name].message}</span>}
    </>
  )
}

export default Input
