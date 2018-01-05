import * as React from 'react';

import * as styles from './profile-list-page.scss';
import { IPageViewProps } from '../model/page';

export class ProfileListPage extends React.Component<IPageViewProps> {
  public render() {
    return (
      <div className={styles.container}>
        Profile List Page
      </div>
    );
  }
 }
