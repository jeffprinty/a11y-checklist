import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import Main from './Main';
import Assessment from './Assessment';

const Router = () => (
  <Switch>
    <Route exact path="/" component={ Main } />
    <Route path="/:id" component={ Assessment } />
  </Switch>
);

export default Router;
