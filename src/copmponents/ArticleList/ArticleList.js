/*eslint-disable*/

import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Pagination, Spin } from 'antd'

import ArticleItem from '../ArticleItem/ArticleItem'

import s from './Article.module.scss'
import './ArticleList.css'
import ServiceBlog from '../../serviceBlog/ServiceBlog'

const ArticleList = (props) => {
  const [total, setTotal] = useState(0)
  const [articles, setArticles] = useState([])
  // const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const { getArticles } = new ServiceBlog()

  const { currentPage, setCurrentPage } = props

  useEffect(() => {
    setLoading(true)
  }, [currentPage])

  useEffect(() => {
    getArticles(currentPage).then(({ articles, articlesCount }) => {
      setArticles(articles)
      setTotal(articlesCount)
      setLoading(false)
    })
  }, [currentPage])
  const listEl = articles.map((article) => {
    return (
      <li key={uuidv4()}>
        <ArticleItem article={article} />
      </li>
    )
  })
  return (
    <div className={s.articleList__container}>
      {loading ? <Spin size="large" /> : <ul className={s.articleList}>{listEl}</ul>}
      {!loading ? (
        <Pagination
          showSizeChanger={false}
          onChange={(page) => setCurrentPage(page)}
          current={currentPage}
          total={total}
          pageSize={20}
        />
      ) : null}
    </div>
  )
}

export default ArticleList
