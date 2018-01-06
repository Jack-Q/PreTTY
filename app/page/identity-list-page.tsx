import * as React from 'react';

import * as styles from './identity-list-page.scss';
import { IPageViewProps, PageViewType } from '../model/page';
import { transitionService } from '../service/transition-service';
import { pageService } from '../service/page-service';
import { Button } from '../component/button';
import { createIdentityCreatePage } from './identity-create-page';
import { ISshIdentity } from '../model/identity';
import { modelServiceConnector } from '../service/model-service';

interface IProps {
  identityList: ISshIdentity[];
}

class IdentityListPageView extends React.Component<IPageViewProps & IProps> {
  public render() {
    return (
      <div className={styles.container}>
        Identity List Page
        <div>
          <Button label="create new identity" onClick={(e) => this.transitToCreatePage(e)} />
        </div>
        <div>
          {
            this.props.identityList.map((i) => (
              <div>
                {i.profileName}
                {/* {i.userName} */}
                {i.remark}
              </div>
            ))
          }
          {
            this.props.identityList.length === 0 &&
            <div className="empty-tip">

            </div>
          }
        </div>
      </div>
    );
  }

  private transitToCreatePage(e: React.MouseEvent<Element>) {
    this.transitPage(e, createIdentityCreatePage());
  }

  private transitPage(e: React.MouseEvent<Element>, page: PageViewType) {
    transitionService.transitOnClick(e, '#09c', () => {
      pageService.replaceTabPage(this.props.tabId, page);
    });
  }
}

export const IdentityListPage = modelServiceConnector<IProps, IPageViewProps>(
  (state, svc) => ({ identityList: state.identityList }),
  IdentityListPageView,
);
