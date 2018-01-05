import * as React from 'react';

import * as styles from './settings-page.scss';
import { IPageViewProps } from '../model/page';

export class SettingsPage extends React.Component<IPageViewProps> {
  public render() {
    return (
      <div className={styles.container}>
        Settings Page
      </div>
    );
  }
 }
