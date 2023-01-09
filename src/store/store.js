import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'

import { ArticlesReducer } from './reducers/ArticlesReducer'
import { UserReducer } from './reducers/UserReducer'

const reducers = combineReducers({
  articles: ArticlesReducer,
  user: UserReducer,
})

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

export default store
