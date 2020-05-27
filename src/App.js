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
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)
  const [repos, setRepos] = useState([])


  //when a valid search is submitted
  const searchUsers = text => {

    setLoading(true)

    axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`)
      .then(res => {
        setUsers(res.data.items)
        setLoading(false)
        setAlert(null)
      })
  }

  const getUser = username => {
    
    setLoading(true)

    axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`)
      .then(res => {
        setUser(res.data)
        setLoading(false)
        setAlert(null)
      })
  }

  const getUsersRepos = username => {

    setLoading(true)

    axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`)
      .then(res => {
        setRepos(res.data)
        setLoading(false)
        setAlert(null)
      })
  }

  // clear user from ui by setting state
  const clearUsers = () => {
    setUsers([])
    setLoading(false)
  }

  //happens when an invalid search is submitted
  const createAlert = (msg, type) => {

    setAlert({
      msg,
      type
    })

    setTimeout(() => setAlert(null), 2000)
  }


  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className="container">
        <Alert alert={alert}/>
        <Switch>
          <Route path='/' exact render={() => (
            <Fragment>
              <Search 
              searchUsers={searchUsers} 
              clearUsers={clearUsers} 
              showClear={users.length > 0 ? true : false}
              createAlert={createAlert}
              />
              <Users loading={loading} users={users} />
            </Fragment>
          )} />
          <Route path='/about' exact  component={About}/>
          <Route path='/user/:login' exact render={ props => (
            <User {...props} getUserRepos={getUsersRepos} getUser={getUser} user={user} loading={loading} repos={repos}/>
          )}/>
        </Switch>
        
      </div>
    </div>
    </Router>

  )
}

export default App
