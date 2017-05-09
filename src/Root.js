import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

import App from './App.js';
// import Home from './Home.js';

const Home = () => <h1>Hello from Home!</h1>
class Root extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Home} />
        <Route path='/checklist' component={App} />
      </Router>
    )
  }
}
export default Root
