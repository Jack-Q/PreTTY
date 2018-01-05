import * as React from 'react';

import * as styles from './welcome-page.scss';
import { IPageViewProps } from '../model/page';

export class WelcomePage extends React.Component<IPageViewProps> {
  public render() {
    return (
      <div className={styles.container}>
        Welcome Page
      </div>
    );
  }
 }
