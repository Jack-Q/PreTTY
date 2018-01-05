import * as React from 'react';

import * as styles from './identity-list-page.scss';
import { IPageViewProps } from '../model/page';

export class IdentityListPage extends React.Component<IPageViewProps> {
  public render() {
    return (
      <div className={styles.container}>
        Identity List Page
      </div>
    );
  }
 }
