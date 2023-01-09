import React, { useEffect } from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ArticleList from '../ArticleList/ArticleList'
import ArticleFull from '../ArticleFull/ArticleFull'
import Registration from '../Registration/Registration'
import Authorization from '../Authorization/Authorization'
import Header from '../Header/Header'
import Profile from '../Profile/Profile'
import * as actions from '../../store/actions/UserActions'
import PrivateRoute from '../../hoc/PrivateRoute'
import ArticleFormHoc from '../../hoc/ArticleFormHoc'
import ArticleForm from '../ArticleForm/ArticleForm'

import s from './App.module.scss'

const App = (props) => {
  const { getCurrentUserAction, isLoggedIn, token, currentUser, logOutAction } = props

  useEffect(() => {
    if (isLoggedIn) {
      getCurrentUserAction(token)
    }
  }, [isLoggedIn, token])

  return (
    <>
      <Router>
        <Header logOutAction={logOutAction} isLoggedIn={isLoggedIn} currentUser={currentUser} />
        <section className={s.container}>
          <Switch>
            <Redirect exact from="/" to="/articles" />
            <PrivateRoute path="/new-article">
              <ArticleForm />
            </PrivateRoute>
            <PrivateRoute path="/profile">
              <Profile />
            </PrivateRoute>
            <PrivateRoute path="/articles/:slug/edit/">
              <ArticleFormHoc />
            </PrivateRoute>
            <Route path="/articles" exact component={ArticleList} />
            <Route path="/articles/:slug/" component={ArticleFull} />
            <Route path="/sign-up" component={Registration} />
            <Route path="/sign-in" component={Authorization} />
            <Redirect to="/" />
          </Switch>
        </section>
      </Router>
    </>
  )
}

const mapStateToProps = ({ user }) => {
  const { isLoggedIn, token } = user
  return {
    currentUser: user.currentUser,
    isLoggedIn,
    token,
  }
}

const mapDispatchToProps = (dispatch) => {
  const { getCurrentUserAction, logOutAction } = bindActionCreators(actions, dispatch)
  return { getCurrentUserAction, logOutAction }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
