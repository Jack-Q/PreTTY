import * as React from 'react';

import * as styles from './profile-list-page.scss';
import { IPageViewProps, PageViewType } from '../model/page';
import { ISshProfile } from '../model/profile';
import { ISshIdentity } from '../model/identity';
import { ISshHostServer } from '../model/host-server';
import { modelServiceConnector } from '../service/model-service';
import { HostListPage } from './host-list-page';
import { transitionService } from '../service/transition-service';
import { pageService } from '../service/page-service';
import { IdentityListPage } from './identity-list-page';
import { createProfileEditPage } from './profile-edit-page';
import { DefaultPage } from './index';
import { createVirtualTerminalPage } from './virtual-terminal-page';
import { createFileManagerPage } from './file-manager-page';
interface IProps {
  profileList: ISshProfile[];
  hostList: ISshHostServer[];
  identityList: ISshIdentity[];
}

class ProfileListPageView extends React.Component<IPageViewProps & IProps> {
  public render() {
    return (
      <div className={styles.container}>
        <div className={styles.Header}>
          <div className={styles.PageTitle}>
            <button
              onClick={(e) => this.transitToWelcomePage(e)}
              className={styles.arrowBack}
            >
              <i className="material-icons">arrow_back</i>
            </button>
            Profile List Page
          </div>
      </div>
        <div className={styles.profileContainer}>
          {
            this.props.profileList.map((p) => (
              <div className={styles.profile} key={p.id}>
                <div
                  className={styles.profileIcon}
                >
                  <i className="material-icons">computer</i>
                  <div className={styles.actions}>
                    <div
                      onClick={(e) => this.connectSftp(e, p)}
                    >
                      <i className="material-icons">folder_open</i>
                      <div>SFTP</div>
                    </div>
                    <div
                      onClick={(e) => this.connectShell(e, p)}
                    >
                    <i className="material-icons">dvr</i>
                    <div>Shell</div>
                    </div>
                  </div>
                </div>
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
        <div className={styles.btnGroup}>
          <button className={styles.NavBtn} onClick={(e) => this.transitPage(e, createProfileEditPage())}>
            <i className="material-icons">add_box</i>
          </button>
          <button className={styles.NavBtn} onClick={(e) => this.transitToHostList(e)}>
            <i className="material-icons">computer</i>
          </button>
          <button className={styles.NavBtn} onClick={(e) => this.transitPage(e, IdentityListPage)}>
            <i className="material-icons">person</i>
          </button>
        </div>
      </div>
    );
  }

  private transitToHostList(e: React.MouseEvent<Element>) {
    this.transitPage(e, HostListPage);
  }

  private transitPage(e: React.MouseEvent<Element>, page: PageViewType) {
    transitionService.transitOnClick(e, '#09c', () => {
      pageService.replaceTabPage(this.props.tabId, page);
    });
  }

  private transitToWelcomePage(e: React.MouseEvent<Element>) {
    this.transitPage(e, DefaultPage);
  }

  private connectShell(e: React.MouseEvent<Element>, profile: ISshProfile) {
    this.transitPage(e, createVirtualTerminalPage(profile));
  }
  private connectSftp(e: React.MouseEvent<Element>, profile: ISshProfile) {
    this.transitPage(e, createFileManagerPage(profile));
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
