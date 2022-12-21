import React, { useEffect, useState } from 'react'
import { Alert, Spin } from 'antd'

import ArticleItem from '../ArticleItem/ArticleItem'
import ServiceBlog from '../../serviceBlog/ServiceBlog'

import s from './ArticleFull.module.scss'

const ArticleFull = ({ slug }) => {
  const [article, setArticle] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { getArticle } = new ServiceBlog()

  useEffect(() => {
    getArticle(slug)
      .then(({ article }) => {
        setArticle(article)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        setError(true)
      })
  }, [])

  const errorEl = error ? <Alert message="Статья не найдена" type="warning" style={{ width: 800, height: 50 }} /> : null
  const content = error ? null : loading ? <Spin size="large" /> : <ArticleItem article={article} isFull />
  return (
    <div className={s.container}>
      {errorEl}
      {content}
    </div>
  )
}

export default ArticleFull
