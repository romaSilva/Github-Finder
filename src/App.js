import React, {useState, useEffect} from 'react'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'

import axios from 'axios'
import './App.css'

function App() {

  //initial state declaration
  const [state, setState] = useState({
    users: [],
    loading: false,
    alert: null
  })

  //when a valid search is submitted
  const searchUsers = text => {

    setState({
      ...state,
      loading: true
    })

    axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`)
      .then(res => setState({
        users: res.data.items,
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
    <div className="App">
      <Navbar />
      <div className="container">
        <Alert alert={state.alert}/>
        <Search 
          searchUsers={searchUsers} 
          clearUsers={clearUsers} 
          showClear={state.users.length > 0 ? true : false}
          setAlert={setAlert}
        />
        <Users loading={state.loading} users={state.users}/>
      </div>
    </div>
  )
}

export default App
