import * as React from 'react';
import * as Redux from 'react-redux';

import { Provider } from 'react-redux';

import { App } from './app';
import { HomePage } from './home-page';
interface IRootType {
  store: Redux.Store<any>;
}

export default function Root({ store }: IRootType) {
  return (
    <Provider store={store}>
      <App>
        <HomePage />
      </App>
    </Provider>
  );
}
