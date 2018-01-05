import * as React from 'react';

import * as styles from './file-manager-page.scss';
import { IPageViewProps } from '../model/page';

export class FileManagerPage extends React.Component<IPageViewProps> {
  public render() {
    return (
      <div className={styles.container}>
        File Manager Page
      </div>
    );
  }
 }
