import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './container/root';
import './app.global.scss';

// tslint:disable-next-line:no-var-requires
const { configureStore, history } = require('./core/store/configureStore');
const store = configureStore();

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root'),
);

if ((module as any).hot) {
  (module as any).hot.accept('./container/root', () => {
    const NextRoot = require('./container/root').default;
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}
