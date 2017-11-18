import * as React from 'react';
import { Switch, Route } from 'react-router';
import App from '../containers/app';
import HomePage from '../containers/home-page';

export default () => (
  <App>
    <Switch>
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
