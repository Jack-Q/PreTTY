import * as React from 'react';

import * as styles from './host-list-page.scss';
import { IPageViewProps, PageViewType } from '../model/page';
import { ISshHostServer } from '../model/host-server';
import { modelServiceConnector } from '../service/model-service';
import { transitionService } from '../service/transition-service';
import { pageService } from '../service/page-service';
import { ProfileListPage } from './profile-list-page';
import { Button } from '../component/button';

interface IProps {
  hostList: ISshHostServer[];
}
class HostListPageView extends React.Component<IPageViewProps & IProps> {
  public render() {
    return (
      <div className={styles.container}>
        <div className={styles.PageTitle}>Host List Page</div>
        <div className={styles.ControlBtn}>
          <Button label="back to profile list" onClick={(e) => this.transitToProfileListPage(e)} />
        </div>
        <div>
          {
            this.props.hostList.map((s) => (
              <div className={styles.host} key={s.id}>
                <div className={styles.hostIcon}><i className="material-icons">filter_drama</i></div>
                <div className={styles.hostAddr}>{s.title} ({s.hostAddress}:{s.hostPort})</div>
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

  private transitToProfileListPage(e: React.MouseEvent<Element>) {
    this.transitPage(e, ProfileListPage);
  }

  private transitPage(e: React.MouseEvent<Element>, page: PageViewType) {
    transitionService.transitOnClick(e, '#09c', () => {
      pageService.replaceTabPage(this.props.tabId, page);
    });
  }
}

export const HostListPage = modelServiceConnector<IProps, IPageViewProps>(
  (state, svc) => ({ hostList: state.hostList }),
  HostListPageView,
);
