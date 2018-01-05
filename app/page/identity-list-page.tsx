import * as React from 'react';

import * as styles from './identity-list-page.scss';
import { IPageViewProps, PageViewType } from '../model/page';
import { transitionService } from '../service/transition-service';
import { pageService } from '../service/page-service';
import { Button } from '../component/button';
import { IdentityCreatePage } from './identity-create-page';

export class IdentityListPage extends React.Component<IPageViewProps> {
  public render() {
    return (
      <div className={styles.container}>
        Identity List Page
        <div>
          <Button label="create new identity" onClick={(e) => this.transitToCreatePage(e)} />
        </div>
      </div>
    );
  }

  private transitToCreatePage(e: React.MouseEvent<Element>) {
    this.transitPage(e, IdentityCreatePage);
  }

  private transitPage(e: React.MouseEvent<Element>, page: PageViewType) {
    transitionService.transitOnClick(e, '#09c', () => {
      pageService.replaceTabPage(this.props.tabId, page);
    });
  }
}
