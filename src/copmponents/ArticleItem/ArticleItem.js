import React, { useState } from 'react'
import { Typography } from 'antd'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

import Author from '../Author/Author'
import Taglist from '../TagList/Taglist'

import s from './ArticleItem.module.scss'

const ArticleItem = (props) => {
  const [like, setLike] = useState(false)
  const authorized = false
  const { Paragraph, Title } = Typography
  const { article, isFull } = props
  const { title, tagList, body, author, createdAt, updatedAt, favoritesCount, slug } = article

  return (
    <div className={s.article}>
      <div className={s.article__info}>
        <div className={s.article__header}>
          <div className={s.article__title}>
            <Title ellipsis={{ rows: 2 }} level={3}>
              <Link to={`/articles/${slug}`}>{title}</Link>
            </Title>
          </div>
          <span className={s.article__likes}>
            <button className={s.article__btn} onClick={() => setLike((like) => (authorized ? !like : null))}>
              {like ? (
                <HeartFilled className={authorized ? s.article__icon : s.article__icon_disable} />
              ) : (
                <HeartOutlined className={authorized ? s.article__icon : s.article__icon_disable} />
              )}
            </button>
            {favoritesCount}
          </span>
        </div>
        <Taglist tagList={tagList} />

        <div className={s.article__text}>
          {isFull ? <ReactMarkdown>{body}</ReactMarkdown> : <Paragraph ellipsis={{ rows: 3 }}>{body}</Paragraph>}
        </div>
      </div>
      <Author author={author} createdAt={createdAt} updatedAt={updatedAt} />
    </div>
  )
}

export default ArticleItem
