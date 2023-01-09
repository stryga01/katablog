import React from 'react'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect, useHistory, useParams } from 'react-router-dom'

import Input from '../Input/Input'
import TagsForm from '../TagsForm/TagsForm'
import ServiceBlog from '../../serviceBlog/ServiceBlog'
import * as actions from '../../store/actions/ArticlesAction'

import s from './ArticleForm.module.scss'

const ArticleForm = ({ token, defaultValue, edit, setLoadingAction, author, currentUser }) => {
  const { createArticle } = new ServiceBlog()
  const history = useHistory()
  const { slug } = useParams()

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    mode: 'onBlur',
    defaultValues: defaultValue || { taglist: [''] },
  })

  const onSubmit = (data) => {
    if (edit) {
      createArticle(data, 'PUT', token, slug).then(() => {
        reset({ title: '', description: '', body: '', tagList: [''] })
        setLoadingAction()
        history.push(`/articles/${slug}`)
      })
    } else {
      createArticle(data, 'POST', token).then(({ article }) => {
        reset()
        setLoadingAction()
        history.push(`/articles/${article.slug}`)
      })
    }
  }
  if (author ? author.username !== currentUser.username : false) {
    return <Redirect to={`/articles/${slug}`} />
  }

  return (
    <form className={s.article} onSubmit={handleSubmit(onSubmit)}>
      <h1>{edit ? 'Edit article' : 'Create new article'}</h1>
      <ul className={s.article__list}>
        <li className={s.article__item}>
          <Input
            errors={errors}
            register={{
              ...register('title', {
                required: 'Поле не должно быть пустым',
              }),
            }}
            setting={{ name: 'title', type: 'text', placeholder: 'Title', label: 'Title' }}
          />
        </li>
        <li className={s.article__item}>
          <Input
            errors={errors}
            register={{
              ...register('description', {
                required: 'Поле не должно быть пустым',
              }),
            }}
            setting={{
              name: 'description',
              type: 'text',
              placeholder: 'Short description',
              label: 'Short description',
            }}
          />
        </li>
        <li className={s.article__item}>
          <Input
            errors={errors}
            register={{
              ...register('body', {
                required: 'Поле не должно быть пустым',
              }),
            }}
            setting={{
              name: 'body',
              type: 'textarea',
              placeholder: 'Text',
              label: 'Text',
              textarea: true,
            }}
          />
        </li>
        <TagsForm register={register} control={control} />
      </ul>
      <button type="submit" className={s.article__submit}>
        Send
      </button>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    loading: state.articles.loading,
    currentUser: state.user.currentUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { getFullArticle, setLoadingAction } = bindActionCreators(actions, dispatch)
  return {
    getFullArticle,
    setLoadingAction,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleForm)
