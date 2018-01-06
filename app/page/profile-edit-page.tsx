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

interface IProps {
  profileId: string;
  hostList: ISshHostServer[];
  identityList: ISshIdentity[];
}

interface IState {
  title: string;
  remark: string;
  hostId: string;
  identityId: string;
}

const initialState = {
  title: '',
  remark: '',
  hostId: '',
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
        Profile New Page
        <div>
          <TextInput
            label="Profile Title"
            value={this.state.title}
            onChange={(v) => this.setState({ title: v })} />
          <TextInput
            label="Profile Remark"
            value={this.state.remark}
            onChange={(v) => this.setState({ remark: v })} />
          <div>
            {
              this.props.identityList.map((i) => (
                <div key={i.id} onClick={() => this.setState({identityId: i.id})}>
                  {i.profileName}
                </div>
              ))
            }
          </div>
          <div>
            {/* Pick Host */}
          </div>
        </div>
        <div>
          <Button label="create" onClick={(e) => this.saveProfile(e)} />
          <Button label="reset" onClick={(e) => this.resetState(e)} />
          <Button label="cancel" onClick={(e) => this.transitProfileListPage(e)} />
        </div>
      </div>
    );
  }

  private saveProfile(e: React.MouseEvent<Element>) {
    const profile = {
      ...this.profile,
      ...this.state,
      createdAtTimeStamp: Date.now(),
    };
    modelService.saveProfile(profile);
    this.transitPage(e, ProfileListPage);
  }

  private resetState(e?: React.MouseEvent<Element>) {
    if (!e) {
      this.state = {
        title: this.profile.title,
        remark: this.profile.remark,
        hostId: this.profile.hostId,
        identityId: this.profile.identityId,
      };
      return;
    }
    transitionService.transitOnClick(e, '#09c', () => {
      this.resetState();
    });
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
