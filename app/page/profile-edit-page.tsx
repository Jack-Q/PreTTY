import * as React from 'react';

import * as styles from './profile-edit-page.scss';
import { IPageViewProps, PageViewType } from '../model/page';
import { ISshIdentity } from '../model/identity';
import { modelService, modelServiceConnector } from '../service/model-service';
import { ISshHostServer } from '../model/host-server';
import { ISshProfile } from '../model/profile';
import { TextInput } from '../component/text-input';
import { getUid } from '../util/uid';
import { Button } from '../component/button';
import { transitionService } from '../service/transition-service';
import { pageService } from '../service/page-service';
import { ProfileListPage } from './profile-list-page';
import { createIdentityCreatePage } from './identity-create-page';

interface IProps {
  profileId: string;
  hostList: ISshHostServer[];
  identityList: ISshIdentity[];
}

interface IState {
  title: string;
  remark: string;
  hostAddress: string;
  hostPort: number;
  identityId: string;
}

const initialState = {
  title: '',
  remark: '',
  hostAddress: '',
  hostPort: 22,
  identityId: '',
};

export class ProfileEditPageView extends React.Component<IPageViewProps & IProps, IState> {
  private profile: ISshProfile;
  constructor(props: IPageViewProps & IProps) {
    super(props);

    this.profile = {
      id: props.profileId,
      title: '',
      remark: '',
      hostId: '',
      identityId: '',
      lastUsedTimeStamp: 0,
      createdAtTimeStamp: 0,
      ...(modelService.getProfileById(props.profileId) || {}),
    };
    this.state = initialState;
    this.resetState();
  }

  public render() {
    return (
      <div className={styles.container}>
        <div className={styles.Header}>
          <div className={styles.PageTitle}><button onClick={(e) => this.transitProfileListPage(e)} className={styles.arrowBack}><i className="material-icons">arrow_back</i></button>Profile New Page</div>
        </div>
        <div className={styles.contentContainer}>
        {/* ---------------------------Identity------------------------ */}
          <div className={styles.Identity}>
            <TextInput
              label="Profile Title"
              value={this.state.title}
              onChange={(v) => this.setState({ title: v })} />
            <TextInput
              label="Profile Remark"
              isTextFiled={true}
              value={this.state.remark}
              onChange={(v) => this.setState({ remark: v })} />
            <div className={styles.identityList}>
              <div className={styles.identityListTitle}>Idnetity list</div>
                {             
                  this.props.identityList.map((i) => (              
                    <div
                      className={styles.identityListOption}
                      key={i.id}
                      onClick={() => this.setState({ identityId: i.id })}
                      style={{ color: this.state.identityId === i.id ? 'rgb(255, 238, 0)' : 'rgb(144, 137, 75)' }}>
                      <i className="material-icons">person</i>
                      <div className={styles.profileName}>{i.profileName}</div>
                    </div>
                  ))
                }
                {
                  <div className={styles.btnContainer}>
                    new identity                
                    <button className={styles.addIdBtn} onClick={(e) => this.createNewIdentity(e)}><i className="material-icons">add</i></button>
                  </div>
                }
              </div>
          </div>

          {/* ---------------------------Host----------------------------- */}

          <div className={styles.Host}>
              
              <TextInput
                label="Host Address"
                value={this.state.hostAddress}
                onChange={(v) => this.setState({ hostAddress: v })} />
              <TextInput
                label="Port"
                value={this.state.hostPort.toString()}
                onChange={(v) => this.setState({ hostPort: parseInt(v, 10) })} />
                <div className={styles.hostList}>
                <div className={styles.identityListTitle}>Host List</div>
                {
                  this.props.hostList.map((h) => (
                    <div className={styles.hostListOprion}>
                        <i className="material-icons">computer</i>
                        <div className={styles.hostInfo}>
                          {h.title}({h.hostAddress}:{h.hostPort})
                        </div>
                      </div>
                  ))
                }
              </div>
          </div>
          <div className={styles.btnGroup}>
                <Button label="create" onClick={(e) => this.saveProfile(e)} />
                <Button label="reset" onClick={(e) => this.resetState(e)} />
                <Button label="cancel" onClick={(e) => this.transitProfileListPage(e)} />
          </div>
        </div>
      </div>
    );
  }

  private saveProfile(e: React.MouseEvent<Element>) {
    // TODO: validate identity
    const hostServer: ISshHostServer =
      modelService.getHostByAddress(this.state.hostAddress, this.state.hostPort) || {
        id: getUid(),
        title: `${this.state.hostAddress}:${this.state.hostPort}`,
        hostAddress: this.state.hostAddress,
        hostPort: this.state.hostPort,
        publicKey: '',
        keyTrusted: false,
      };
    modelService.saveHostServer(hostServer);
    const profile = {
      ...this.profile,
      id: this.props.profileId,
      title: this.state.title,
      remark: this.state.remark,
      hostId: hostServer.id,
      identityId: this.state.identityId,
      createdAtTimeStamp: Date.now(),
    };
    modelService.saveProfile(profile);
    this.transitPage(e, ProfileListPage);
  }

  private resetState(e?: React.MouseEvent<Element>) {
    if (!e) {
      const host = modelService.getHostById(this.profile.id);
      const newState = {
        title: this.profile.title,
        remark: this.profile.remark,
        hostAddress: host ? host.hostAddress : '',
        hostPort: host ? host.hostPort : 22,
        identityId: this.profile.identityId,
      };
      if (this.state) {
        this.setState(newState);
      } else {
        this.state = newState;
      }
      return;
    }
    transitionService.transitOnClick(e, '#09c', () => {
      this.resetState();
    });
  }

  private createNewIdentity(e: React.MouseEvent<Element>) {
    const newIdentityId = getUid();
    this.setState({ identityId: newIdentityId });
    this.transitPage(e, createIdentityCreatePage(newIdentityId));
  }

  private transitProfileListPage(e: React.MouseEvent<Element>) {
    this.transitPage(e, ProfileListPage);
  }

  private transitPage(e: React.MouseEvent<Element>, page: PageViewType) {
    transitionService.transitOnClick(e, '#09c', () => {
      pageService.replaceTabPage(this.props.tabId, page);
    });
  }
}

export const createProfileEditPage = (id: string = getUid()) => {
  const ProfileEditPage = modelServiceConnector<IProps, IPageViewProps>(
    (state, svc) => ({
      profileId: id,
      hostList: state.hostList,
      identityList: state.identityList,
    }),
    ProfileEditPageView,
  );
  return ProfileEditPage;
};
