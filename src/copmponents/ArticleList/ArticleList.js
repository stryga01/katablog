import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Pagination } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ArticleItem from '../ArticleItem/ArticleItem'
import * as actions from '../../store/actions/ArticlesAction'
import Spinner from '../Spinner/Spinner'
import AlertMessage from '../AlertMessage/AlertMessage'

import s from './Article.module.scss'
import '../../styles/antd.scss'

const ArticleList = (props) => {
  const { articles, total, getArticlesAction, currentPage, setCurrentPage, loading, token, error } = props

  useEffect(() => {
    getArticlesAction(currentPage, token)
  }, [currentPage, token])

  const listEl = articles.map((article) => {
    return (
      <li key={uuidv4()}>
        <ArticleItem article={article} />
      </li>
    )
  })
  return error ? (
    <AlertMessage text="Что-то пошло не так" />
  ) : (
    <div className={s.articleList__container}>
      {loading ? <Spinner styles={false} /> : <ul className={s.articleList}>{listEl}</ul>}
      {!loading ? (
        <Pagination
          showSizeChanger={false}
          onChange={(page) => setCurrentPage(page)}
          current={currentPage}
          total={total}
          pageSize={5}
        />
      ) : null}
    </div>
  )
}

const mapStateToProps = ({ articles, user }) => {
  return {
    articles: articles.articles,
    total: articles.total,
    currentPage: articles.currentPage,
    loading: articles.loading,
    token: user.token,
    error: articles.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { getArticlesAction, setCurrentPage } = bindActionCreators(actions, dispatch)
  return {
    getArticlesAction,
    setCurrentPage,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
