import React from 'react'
import { Popconfirm, Typography } from 'antd'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../store/actions/ArticlesAction'
import Author from '../Author/Author'
import Taglist from '../TagList/Taglist'

import s from './ArticleItem.module.scss'
import '../../styles/antd.scss'

const ArticleItem = (props) => {
  const history = useHistory()
  const { Paragraph, Title } = Typography
  const { isFull, isLoggedIn, token, setLikeAction, setLoadingAction, currentUser, article, deleteArticleAction } =
    props
  const { title, tagList, body, author, createdAt, updatedAt, favoritesCount, slug, favorited, description } = article

  const setLike = (slug) => {
    if (!isLoggedIn) {
      return
    }
    favorited ? setLikeAction(slug, token, 'DELETE') : setLikeAction(slug, token, 'POST')
  }

  const onDelete = (slug, token) => {
    deleteArticleAction(slug, token)
    setLoadingAction()
    history.push('/articles')
  }

  return (
    <div className={`${s.article} ${isFull ? s.article__full : null}`}>
      <div className={s.article__info}>
        <div className={s.article__header}>
          <div className={s.article__title}>
            <Title ellipsis={{ rows: 2 }} level={3}>
              {!isFull ? (
                <Link to={`/articles/${slug}`} onClick={setLoadingAction}>
                  {title}
                </Link>
              ) : (
                <div>{title}</div>
              )}
            </Title>
          </div>
          <span className={s.article__likes}>
            <button className={s.article__btn} onClick={() => setLike(slug)}>
              {favorited ? (
                <HeartFilled className={isLoggedIn ? s.article__icon_red : s.article__icon_disable} />
              ) : (
                <HeartOutlined className={isLoggedIn ? s.article__icon : s.article__icon_disable} />
              )}
            </button>
            {favoritesCount}
          </span>
        </div>
        <Taglist tagList={tagList} />
        <Paragraph ellipsis={{ rows: isFull ? 5 : 2 }}>{description}</Paragraph>
        {isFull ? (
          <div className={s.article__text}>
            <ReactMarkdown>{body}</ReactMarkdown>
          </div>
        ) : null}
      </div>
      <div className={s.article__author}>
        <Author author={author} createdAt={createdAt} updatedAt={updatedAt} />
        {author.username === currentUser.username && isFull ? (
          <div className={s.article__groupBtn}>
            <Popconfirm
              placement="rightTop"
              title="Are you sure to delete this article?"
              onConfirm={() => onDelete(slug, token)}
              okText="Yes"
              cancelText="No"
            >
              <button className={s.article__delete}>Delete</button>
            </Popconfirm>
            <Link to={`/articles/${slug}/edit`}>
              <button className={s.article__edit}>Edit</button>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    token: state.user.token,
    currentUser: state.user.currentUser,
    error: state.articles.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { setLikeAction, setLoadingAction, deleteArticleAction } = bindActionCreators(actions, dispatch)
  return {
    setLikeAction,
    setLoadingAction,
    deleteArticleAction,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleItem)
