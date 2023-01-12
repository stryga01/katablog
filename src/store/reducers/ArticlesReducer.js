import {
  DELETE_ARTICLE,
  GET_ARTICLES,
  GET_FULL_ARTICLE,
  SET_CURRENT_PAGE,
  SET_ERROR,
  SET_FAVORITE,
  SET_LOADING,
} from '../reduxTypes'

const initialState = {
  total: 0,
  articles: [],
  fullArticle: null,
  currentPage: 1,
  loading: true,
  error: false,
}

export const ArticlesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ARTICLES: {
      return { ...state, articles: [...payload.articles], total: payload.total, loading: false, error: false }
    }
    case GET_FULL_ARTICLE: {
      return { ...state, fullArticle: payload, loading: false, error: false }
    }
    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: payload, loading: true, error: false }
    }
    case SET_FAVORITE: {
      const idx = state.articles.findIndex((el) => el.slug === payload.article.slug)
      const favoriteArticle = {
        ...state.articles[idx],
        favorited: payload.favorited,
        favoritesCount: payload.favoritesCount,
      }
      return {
        ...state,
        articles: [...state.articles.slice(0, idx), favoriteArticle, ...state.articles.slice(idx + 1)],
        fullArticle: payload.article,
      }
    }

    case DELETE_ARTICLE: {
      return {
        ...state,
        articles: state.articles.filter((article) => article.slug !== payload),
      }
    }

    case SET_LOADING: {
      return { ...state, loading: payload || true, error: false }
    }

    case SET_ERROR: {
      return {
        ...state,
        error: true,
        loading: false,
      }
    }
    default: {
      return { ...state }
    }
  }
}
