import * as React from 'react';

import * as styles from './identity-create-page.scss';
import { IPageViewProps, PageViewType } from '../model/page';
import { Button } from '../component/button';
import { transitionService } from '../service/transition-service';
import { pageService } from '../service/page-service';
import { IdentityListPage } from './identity-list-page';
import { TextInput } from '../component/text-input';

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
export class IdentityCreatePage extends React.Component<IPageViewProps, IState> {
  constructor(props: IPageViewProps) {
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
          <Button label="Help" onClick={() => { }} />
        </div>
      </div>
    );
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
