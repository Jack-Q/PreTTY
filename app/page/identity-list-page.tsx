import * as React from 'react';

import * as styles from './identity-list-page.scss';
import { IPageViewProps, PageViewType } from '../model/page';
import { transitionService } from '../service/transition-service';
import { pageService } from '../service/page-service';
import { Button } from '../component/button';
import { createIdentityCreatePage } from './identity-create-page';
import { ISshIdentity } from '../model/identity';
import { modelServiceConnector, modelService } from '../service/model-service';
import { createDialog } from '../model/dialog';
import { dialogService } from '../service/dialog-service';

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
              <div key={i.id}>
                {i.profileName}
                {i.userName}
                {i.remark}
                <div>
                  {
                    i.authentications.map((a) => (
                      <div>
                        {/* display icon indicator */}
                        {a.mode}
                      </div>
                    ))
                  }
                </div>
                <div>
                <Button label="edit" onClick={(e) => this.transitToCreatePage(e, i.id)} />
                  <Button label="remove" onClick={() => this.removeProfile(i)} />
                </div>
              </div>
            ))
          }
          {
            this.props.identityList.length === 0 &&
            <div className="empty-tip">
              No identity profile available, please create one first.
            </div>
          }
        </div>
      </div>
    );
  }

  private removeProfile(i: ISshIdentity) {
    // TODO: add profile detail
    const dialog = createDialog('Confirm', 'Sure to remove this profile? ', [
      {
        title: 'remove',
        action: () => {
          modelService.removeIdentity(i);
        },
      },
      {
        title: 'cancel',
        action: null,
      },
    ]);
    dialogService.showDialog(dialog);
  }

  private transitToCreatePage(e: React.MouseEvent<Element>, id?: string) {
    this.transitPage(e, createIdentityCreatePage(id));
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
