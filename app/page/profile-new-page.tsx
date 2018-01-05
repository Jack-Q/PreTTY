import * as React from 'react';

import * as styles from './profile-new-page.scss';
import { IPageViewProps } from '../model/page';

export class ProfileNewPage extends React.Component<IPageViewProps> {
  public render() {
    return (
      <div className={styles.container}>
        Profile New Page
      </div>
    );
  }
 }
