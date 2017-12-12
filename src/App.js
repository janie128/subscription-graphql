import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css'
import Root from './Root'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">First React app</h1>
        </header>
        <h2>User List</h2>
        <Root/>
      </div>
    )
  }
}

export default App
