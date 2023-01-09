import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ArticleItem from '../ArticleItem/ArticleItem'
import * as actions from '../../store/actions/ArticlesAction'
import Spinner from '../Spinner/Spinner'
import AlertMessage from '../AlertMessage/AlertMessage'

import s from './ArticleFull.module.scss'

const ArticleFull = (props) => {
  const { token, getFullArticle, fullArticle, loading, error } = props
  const { slug } = useParams()

  useEffect(() => {
    getFullArticle(slug, token)
  }, [])

  return error ? (
    <AlertMessage text="Статья не найдена" />
  ) : (
    <div className={s.article__container}>
      {loading ? <Spinner styles /> : <ArticleItem article={fullArticle} isFull />}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    fullArticle: state.articles.fullArticle,
    loading: state.articles.loading,
    error: state.articles.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { getFullArticle } = bindActionCreators(actions, dispatch)
  return {
    getFullArticle,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleFull)
