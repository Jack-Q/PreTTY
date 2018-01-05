import * as React from 'react';
import * as Redux from 'react-redux';

import { Provider } from 'react-redux';

import { App } from './app';

import { ClientArea } from './client-area';
import { DialogOverlay, NotificationOverlay, QuickActionOverlay, TransitionOverlay } from '../overlay';

interface IRootType {
  store: Redux.Store<any>;
}

export default function Root({ store }: IRootType) {
  return (
    // Provider provides application state context
    <Provider store={store}>
      <App stackLayers={[
        <QuickActionOverlay key="quick-action" />,
        <TransitionOverlay key="transition" />,
        <NotificationOverlay key="notification" />,
        <DialogOverlay key="dialog" />,
      ]} clientArea={
        <ClientArea />
      } />
    </Provider>
  );
}
