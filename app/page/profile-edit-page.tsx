import * as React from 'react';

import * as styles from './profile-edit-page.scss';
import { IPageViewProps } from '../model/page';
import { ISshIdentity } from '../model/identity';
import { modelService, modelServiceConnector } from '../service/model-service';
import { ISshHostServer } from '../model/host-server';
import { ISshProfile } from '../model/profile';
import { TextInput } from '../component/text-input';
import { getUid } from '../util/uid';
import { Button } from '../component/button';

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
            {/* Pick Identity */}
          </div>
          <div>
            {/* Pick Host */}
          </div>
        </div>
        <div>
          <Button label="create" onClick={(e) => this.saveProfile(e)} />
          <Button label="reset" onClick={(e) => this.resetState()} />
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
  }

  private resetState() {
    this.state = {
      title: this.profile.title,
      remark: this.profile.remark,
      hostId: this.profile.hostId,
      identityId: this.profile.identityId,
    };
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
