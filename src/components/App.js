import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Assessment from './Assessment';

const App = () => (
  <div className="App">
    <Header />
    <Switch>
      <Route exact path="/" component={ Main } />
      <Route path="/:id" component={ Assessment } />
    </Switch>
  </div>
);

export default App;
