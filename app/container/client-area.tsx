import * as React from 'react';

import { pageServiceConnector } from '../service/page-service';
import { IPage } from '../model/page';

interface IProps {
  pageList: IPage[];
  activeTabId: string;

}
class ClientAreaView extends React.Component<IProps> {
  public render() {
    const isActive = (p: IPage) => p.tabId === this.props.activeTabId;
    return (
      <div>
      {
        this.props.pageList.map((p) => (
          <div style={{
            position: 'absolute',
            overflow: 'hidden',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            opacity: isActive(p) ? 1 : 0,
            pointerEvents: isActive(p) ? 'all' : 'none',
            zIndex: isActive(p) ? 1 : 0,
          }}>
            <p.view key={p.id} state={p.state} title={p.title} tabId={p.tabId} />
          </div>
        ))
      }
      </div>
    );
  }

}

export const ClientArea = pageServiceConnector<IProps, {}>(
  (state, svc) => ({
    pageList: state.pageList,
    activeTabId: state.activeTabId,
  }),
  ClientAreaView,
);
