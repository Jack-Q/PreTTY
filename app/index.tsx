import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './container/root';
import './app.global.scss';
import { init } from './routine/init';

// tslint:disable-next-line:no-var-requires
const { configureStore } = require('./core/store/configureStore');
const store = configureStore();

// initialize application services
init();

render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  document.getElementById('root'),
);

if ((module as any).hot) {
  (module as any).hot.accept('./container/root', () => {
    const NextRoot = require('./container/root').default;
    render(
      <AppContainer>
        <NextRoot store={store} />
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}
