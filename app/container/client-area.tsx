import * as React from 'react';

import { pageServiceConnector } from '../service/page-service';
import { IPage } from '../model/page';

interface IProps {
  pageList: IPage[];
}
class ClientAreaView extends React.Component<IProps> {
  public render() {
    return (
      <>
      {
        this.props.pageList.map((p) => <p.view key={p.id} state={p.state} title={p.title} />)
      }
      </>
    );
  }

}

export const ClientArea = pageServiceConnector<IProps, {}>(
  (state, svc) => ({pageList: state.pageList}),
  ClientAreaView,
);
