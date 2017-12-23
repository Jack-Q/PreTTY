import * as React from 'react';
import * as Redux from 'react-redux';
import { History } from 'history';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import { App } from './app';
import { HomePage } from './home-page';
interface IRootType {
  store: Redux.Store<any>;
  history: History;
}

export default function Root({ store, history }: IRootType) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App>
          <HomePage />
        </App>
      </ConnectedRouter>
    </Provider>
  );
}
