import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import List from './List';
import Assessment from './Assessment';

const Router = () => (
  <Switch>
    <Route exact path="/" component={ List } />
    <Route path="/:id" component={ Assessment } />
  </Switch>
);

export default Router;
