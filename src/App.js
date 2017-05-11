import React, { Component } from 'react';
import Header from './Header';
import Router from './Router';

import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <Router />
      </div>
    );
  }
}

export default App;
