import * as React from 'react';

import * as styles from './host-list-page.scss';
import { IPageViewProps } from '../model/page';
import { ISshHostServer } from '../model/host-server';
import { modelServiceConnector } from '../service/model-service';

interface IProps {
  hostList: ISshHostServer[];
}
class HostListPageView extends React.Component<IPageViewProps & IProps> {
  public render() {
    return (
      <div className={styles.container}>
        Host List Page
        <div>
          {
            this.props.hostList.map((s) => (
              <div key={s.id}>
                {s.title}
                {s.hostAddress}
              </div>
            ))
          }
          {
            this.props.hostList.length === 0 &&
            <div className="empty-tip">
              No host server, please add new profile.
            </div>
          }
        </div>
      </div>
    );
  }
}

export const HostListPage = modelServiceConnector<IProps, IPageViewProps>(
  (state, svc) => ({ hostList: state.hostList }),
  HostListPageView,
);
