import * as React from 'react';

import * as styles from './master-password-page.scss';
import { IPageViewProps } from '../model/page';
import { Button } from '../component/button';
import { transitionService } from '../service';
import { DefaultPage } from './index';
import { pageService } from '../service/page-service';
import { openLink } from '../util/open-external';

export class MasterPasswordPage extends React.Component<IPageViewProps> {
  public render() {
    return (
      <div className={styles.container}>
        <div className={styles.icon}>
          <i className="material-icons">security</i>
        </div>
        <div className={styles.message}>
          enter master password to unlock connection keys
        </div>
        <div className={styles.inputWrapper}>
          <input className={styles.input} type="password"/>
        </div>
        <div className={styles.subActions}>
          <Button label="get help" onClick={() => this.getHelp()} />
          <Button label="cancel" onClick={(e) => this.cancelAuthentication(e)} />
        </div>
      </div>
    );
  }

  private cancelAuthentication(e: React.MouseEvent<HTMLDivElement>) {
    transitionService.transit({
      x: e.clientX,
      y: e.clientY,
      color: '#09c',
    }).then(() => {
      pageService.replaceTabPage(this.props.tabId, DefaultPage);
    });
  }

  private getHelp() {
    openLink('https://github.com/Jack-Q/PreTTY/wiki');
  }
 }
