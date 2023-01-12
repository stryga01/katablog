import React, { useEffect } from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ArticleList from '../ArticleList/ArticleList'
import ArticleFull from '../ArticleFull/ArticleFull'
import Registration from '../pages/Registration/Registration'
import Authorization from '../pages/Authorization/Authorization'
import Header from '../Header/Header'
import * as actions from '../../store/actions/UserActions'
import PrivateRoute from '../../hoc/PrivateRoute'
import ArticleFormHoc from '../../hoc/ArticleFormHoc'
import ArticleForm from '../pages/ArticleForm/ArticleForm'
import ProfileHoc from '../../hoc/ProfileHoc'

import s from './App.module.scss'

const App = (props) => {
  const { getCurrentUserAction, isLoggedIn, token, currentUser, logOutAction, setIsLoggedIn, setToken } = props

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setIsLoggedIn(false)
    } else {
      setIsLoggedIn(true)
      setToken(token)
    }
  }, [])

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
              <ProfileHoc />
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
  const { getCurrentUserAction, logOutAction, setIsLoggedIn, setToken } = bindActionCreators(actions, dispatch)
  return { getCurrentUserAction, logOutAction, setIsLoggedIn, setToken }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
