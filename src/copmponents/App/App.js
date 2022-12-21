import React, { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import ArticleList from '../ArticleList/ArticleList'
import ArticleFull from '../ArticleFull/ArticleFull'
import Registration from '../Registration/Registration'
import Authorization from '../Authorization/Authorization'
import ServiceBlog from '../../serviceBlog/ServiceBlog'
import Header from '../Header/Header'
import Profile from '../Profile/Profile'

import s from './App.module.scss'

const App = () => {
  const { getCurrentUser } = new ServiceBlog()
  const [currentPage, setCurrentPage] = useState(1)
  const [isLogin, setIsLogin] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLogin(true)
      getCurrentUser(token).then(({ user }) => setUser(user))
    }
  }, [isLogin])

  const logOut = () => {
    localStorage.removeItem('token')
    setIsLogin(false)
    setUser({})
  }

  return (
    <>
      <Router>
        <Header logOut={logOut} isLogin={isLogin} setCurrentPage={setCurrentPage} user={user} />
        <section className={s.container}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <ArticleList currentPage={currentPage} setCurrentPage={setCurrentPage} />}
            />
            <Route
              path="/articles"
              exact
              render={() => <ArticleList currentPage={currentPage} setCurrentPage={setCurrentPage} />}
            />
            <Route
              path="/articles/:slug/"
              render={({ match }) => {
                const { slug } = match.params
                return <ArticleFull slug={slug} />
              }}
            />
            <Route
              path="/sign-up"
              render={({ history }) => <Registration history={history} setIsLogin={setIsLogin} setUser={setUser} />}
            />
            <Route
              path="/sign-in"
              render={({ history }) => <Authorization setIsLogin={setIsLogin} setUser={setUser} history={history} />}
            />
            <Route path="/profile" render={({ history }) => <Profile setUser={setUser} history={history} />} />
          </Switch>
        </section>
      </Router>
    </>
  )
}

export default App
