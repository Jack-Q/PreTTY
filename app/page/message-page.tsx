import * as React from 'react';

import * as styles from './master-password-page.scss';
import { IPageViewProps } from '../model/page';
import { Button } from '../component/button';
import { transitionService } from '../service';
import { DefaultPage } from './index';
import { pageService } from '../service/page-service';
import { openLink } from '../util/open-external';
import { getDefinedExternalUrl } from '../config/url-config';

interface IProps {
  message: string;
}

class MessagePageView extends React.Component<IPageViewProps & IProps> {
  public render() {
    return (
      <div className={styles.container}>
        <div className={styles.icon}>
          <i className="material-icons">warning</i>
        </div>
        <div className={styles.message}>
          {this.props.message}
        </div>
        <div className={styles.subActions}>
          <Button label="feedback" onClick={() => this.raiseIssue()} />
          <Button label="welcome page" onClick={(e) => this.welcomePage(e)} />
        </div>
      </div>
    );
  }

  private welcomePage(e: React.MouseEvent<HTMLDivElement>) {
    transitionService.transit({
      x: e.clientX,
      y: e.clientY,
      color: '#09c',
    }).then(() => {
      pageService.replaceTabPage(this.props.tabId, DefaultPage);
    });
  }

  private raiseIssue() {
    openLink(getDefinedExternalUrl('Issues'));
  }
 }

export const getMessagePage = (message: string) => {
  const props = {
    message,
  };
  const MessagePage = (externalProps: IPageViewProps) => (
    <MessagePageView {...externalProps} {...props}/>
  );
  return MessagePage;
};
