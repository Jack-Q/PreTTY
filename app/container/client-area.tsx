import * as React from 'react';

import { MasterPasswordPage, TestPage } from '../page';
export class ClientArea extends React.Component {
  public render() {
    const ActiveView = TestPage || MasterPasswordPage;
    return (
      <>
        <ActiveView />
      </>
    );
  }

}
