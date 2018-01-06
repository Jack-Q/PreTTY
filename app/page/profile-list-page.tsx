import * as React from 'react';

import * as styles from './profile-list-page.scss';
import { IPageViewProps, PageViewType } from '../model/page';
import { ISshProfile } from '../model/profile';
import { ISshIdentity } from '../model/identity';
import { ISshHostServer } from '../model/host-server';
import { modelServiceConnector } from '../service/model-service';
import { Button } from '../component/button';
import { HostListPage } from './host-list-page';
import { transitionService } from '../service/transition-service';
import { pageService } from '../service/page-service';
import { IdentityListPage } from './identity-list-page';
import { createProfileEditPage } from './profile-edit-page';

interface IProps {
  profileList: ISshProfile[];
  hostList: ISshHostServer[];
  identityList: ISshIdentity[];
}

class ProfileListPageView extends React.Component<IPageViewProps & IProps> {
  public render() {
    return (
      <div className={styles.container}>
        <div className={styles.PageTitle}>Profile List Page</div>
        <div>
          {
            this.props.profileList.map((p) => (
              <div className={styles.profile} key={p.id}>
                <div className={styles.profileIcon}><i className="material-icons">computer</i></div>
                <div className={styles.profileInfo}>{p.title}</div>
                <div className={styles.profileInfo}>{p.remark}</div>
              </div>
            ))
          }
          {
            this.props.profileList.length === 0 &&
            <div className="empty-tip">
              No connection profile, please add new profile.
            </div>
          }
        </div>
        <div>
          <Button label="new profile" onClick={(e) => this.transitPage(e, createProfileEditPage())} />
          <Button label="host list" onClick={(e) => this.transitPage(e, HostListPage)} />
          <Button label="identity list" onClick={(e) => this.transitPage(e, IdentityListPage)} />
          <button><i className="material-icons">plus</i></button>
          <button><i className="material-icons">person</i></button>
          <button><i className="material-icons">person</i></button>
        </div>
      </div>
    );
  }

  private transitPage(e: React.MouseEvent<Element>, page: PageViewType) {
    transitionService.transitOnClick(e, '#09c', () => {
      pageService.replaceTabPage(this.props.tabId, page);
    });
  }
}

export const ProfileListPage = modelServiceConnector<IProps, IPageViewProps>(
  (state, svc) => ({
    profileList: state.profileList,
    hostList: state.hostList,
    identityList: state.identityList,
  }),
  ProfileListPageView,
);
