import ServiceBlog from '../../serviceBlog/ServiceBlog'
import * as types from '../reduxTypes'

const { getArticles, setFavorite, getArticle, deleteArticle } = new ServiceBlog()
const { GET_ARTICLES, SET_FAVORITE, DELETE_ARTICLE, SET_LOADING, GET_FULL_ARTICLE, SET_ERROR, SET_CURRENT_PAGE } = types
export const getArticlesAction = (currentPage, token) => {
  return async (dispatch) => {
    getArticles(currentPage, token)
      .then(({ articles, articlesCount }) => {
        dispatch({
          type: GET_ARTICLES,
          payload: {
            articles: articles,
            total: articlesCount,
          },
        })
      })
      .catch(() => {
        dispatch(setError())
      })
  }
}

export const setLikeAction = (slug, token, method) => {
  return async (dispatch) => {
    setFavorite(slug, token, method).then(({ article }) => {
      dispatch({
        type: SET_FAVORITE,
        payload: {
          article: article,
          favorited: article.favorited,
          favoritesCount: article.favoritesCount,
        },
      })
    })
  }
}

export const getFullArticle = (slug, token) => {
  return async (dispatch) => {
    getArticle(slug, token)
      .then(({ article }) => {
        dispatch({
          type: GET_FULL_ARTICLE,
          payload: article,
        })
      })
      .catch(() => {
        dispatch(setError())
      })
  }
}

export const setLoadingAction = () => {
  return { type: SET_LOADING }
}

export const setCurrentPage = (page) => {
  return { type: SET_CURRENT_PAGE, payload: page }
}

export const deleteArticleAction = (slug, token) => {
  return async (dispatch) => {
    deleteArticle(slug, token).then(() => {
      dispatch({
        type: DELETE_ARTICLE,
        payload: slug,
      })
    })
  }
}

export const setError = () => {
  return {
    type: SET_ERROR,
  }
}
