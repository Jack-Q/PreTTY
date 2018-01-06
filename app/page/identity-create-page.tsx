import * as React from 'react';

import * as styles from './identity-create-page.scss';
import { IPageViewProps, PageViewType } from '../model/page';
import { Button } from '../component/button';
import { transitionService } from '../service/transition-service';
import { pageService } from '../service/page-service';
import { IdentityListPage } from './identity-list-page';
import { TextInput } from '../component/text-input';
import { modelServiceConnector } from '../service/model-service';
import { ISshIdentity } from '../model/identity';
import { getUid } from '../util/uid';
import { openLink } from '../util/open-external';
import { getDefinedExternalUrl } from '../config/url-config';

interface IProps {
  currentId: string;
  originalIdentity?: ISshIdentity;
}
interface IState {
  userName: string;
  profileName: string;
  isProfileNameSet: boolean;
  password: string;
  passwordRepeat: string;
  remark: string;
}

const initialState: IState = {
  userName: '',
  profileName: '',
  isProfileNameSet: false,
  password: '',
  passwordRepeat: '',
  remark: '',
};
class IdentityCreatePageView extends React.Component<IProps & IPageViewProps, IState> {
  constructor(props: IProps & IPageViewProps) {
    super(props);
    this.state = initialState;
  }
  public render() {
    return (
      <div className={styles.container}>
        <div className={styles.headerNavigate}>
          <Button onClick={(e) => this.transitToListPage(e)} label="back to identity list" />
        </div>
        <div className={styles.identityForm}>
          <TextInput
            label="User Name"
            value={this.state.userName}
            onChange={(v) => this.setState({ userName: v })}
            helpMessage="unix system user name or other specific account name"
          />
          <TextInput
            label="Profile Name"
            value={this.state.isProfileNameSet ? this.state.profileName : this.state.userName}
            onChange={(v) => this.setState({ profileName: v, isProfileNameSet: true })}
            helpMessage="label for this authentication profile"
          />
          <TextInput
            label="Password"
            value={this.state.password}
            isPassword={true}
            onChange={(v) => this.setState({ password: v })} />
          <TextInput
            label="Password Repeat"
            value={this.state.passwordRepeat}
            isPassword={true}
            onChange={(v) => this.setState({ passwordRepeat: v })} />
            <TextInput
              label="Remark"
              value={this.state.remark}
              isTextFiled={true}
              onChange={(v) => this.setState({ remark: v })} />
        </div>
        <div className={styles.submissionArea}>
          <Button label="Create" onClick={() => { }} />
          <Button label="Reset" onClick={() => this.setState(initialState)} />
          <Button label="Help" onClick={() => this.openOnlineHelp()} />
        </div>
      </div>
    );
  }

  private openOnlineHelp() {
    openLink(getDefinedExternalUrl('WikiHelpIdentityCreatePage'));
  }

  private transitToListPage(e: React.MouseEvent<Element>) {
    this.transitPage(e, IdentityListPage);
  }

  private transitPage(e: React.MouseEvent<Element>, page: PageViewType) {
    transitionService.transitOnClick(e, '#09c', () => {
      pageService.replaceTabPage(this.props.tabId, page);
    });
  }
}

// create page component with bond model id on demand
export const createIdentityCreatePage = (id: string = getUid()) => {
  const IdentityCreatePage = modelServiceConnector<IProps, IPageViewProps>(
    (state, svc) => ({
      currentId: id,
      originalIdentity: state.identityList.find((i) => i.id === id),
    }),
    IdentityCreatePageView,
  );
  return IdentityCreatePage;
};
