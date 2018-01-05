import * as React from 'react';

import * as styles from './file-action-page.scss';
import { IPageViewProps } from '../model/page';

export class FileActionPage extends React.Component<IPageViewProps> {
  public render() {
    return (
      <div className={styles.container}>
        File Action Page
      </div>
    );
  }
 }
