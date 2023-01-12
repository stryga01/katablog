import React, { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ArticleForm from '../copmponents/pages/ArticleForm/ArticleForm'
import * as actions from '../store/actions/ArticlesAction'
import Spinner from '../copmponents/Spinner/Spinner'
import AlertMessage from '../copmponents/AlertMessage/AlertMessage'

const ArticleFormHoc = ({ getFullArticle, token, fullArticle, loading, error }) => {
  const { slug } = useParams()
  useEffect(() => {
    if (slug) {
      getFullArticle(slug, token)
    }
  }, [])

  const defaultValue = useMemo(() => {
    if (!fullArticle) {
      return null
    }
    return {
      tagList: [...fullArticle.tagList],
      body: fullArticle?.body,
      title: fullArticle?.title,
      description: fullArticle?.description,
    }
  }, [fullArticle])

  return error ? (
    <AlertMessage text="Статья не найдена" />
  ) : !slug ? (
    <ArticleForm />
  ) : defaultValue ? (
    <ArticleForm defaultValue={defaultValue} author={fullArticle.author} edit />
  ) : loading ? (
    <Spinner styles />
  ) : null
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

export default connect(mapStateToProps, mapDispatchToProps)(ArticleFormHoc)
