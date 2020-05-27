import React, {useState, useEffect, Fragment} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import User from './components/users/User'

import axios from 'axios'
import './App.css'

function App() {

  //initial state declaration
  const [state, setState] = useState({
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: []

  })

  //when a valid search is submitted
  const searchUsers = text => {

    setState({
      ...state,
      loading: true
    })

    axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`)
      .then(res => setState({
        ...state,
        users: res.data.items,
        loading: false,
        alert: null
      }))
  }

  const getUser = username => {
    setState({
      ...state,
      loading: true
    })

    axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`)
      .then(res => setState({
        ...state,
        user: res.data,
        loading: false,
        alert: null,
      }))
  }

  const getUsersRepos = username => {
    setState({
      ...state,
      loading: true
    })

    axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`)
      .then(res => setState({
        ...state,
        repos: res.data,
        loading: false,
        alert: null
      }))
  }

  // clear user from ui by setting state
  const clearUsers = () => {
    setState({
      ...state,
      users: [],
      loading: false
    })
  }

  //happens when an invalid search is submitted
  const setAlert = (msg, type) => {
    setState({
      ...state,
      alert: {
        msg,
        type
      }
    })

    setTimeout(() => setState({
      ...state,
      alert: null
    }), 2000)
  }


  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className="container">
        <Alert alert={state.alert}/>
        <Switch>
          <Route path='/' exact render={() => (
            <Fragment>
              <Search 
              searchUsers={searchUsers} 
              clearUsers={clearUsers} 
              showClear={state.users.length > 0 ? true : false}
              setAlert={setAlert}
              />
              <Users loading={state.loading} users={state.users} />
            </Fragment>
          )} />
          <Route path='/about' exact  component={About}/>
          <Route path='/user/:login' exact render={ props => (
            <User {...props} getUserRepos={getUsersRepos} getUser={getUser} user={state.user} loading={state.loading} repos={state.repos}/>
          )}/>
        </Switch>
        
      </div>
    </div>
    </Router>

  )
}

export default App
