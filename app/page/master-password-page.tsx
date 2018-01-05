import * as React from 'react';

import * as styles from './master-password-page.scss';
import { IPageViewProps } from '../model/page';

export class MasterPasswordPage extends React.Component<IPageViewProps> {
  public render() {
    return (
      <div className={styles.container}>
        <div className={styles.icon}>
          <i className="material-icons">security</i>
        </div>
        <div className={styles.message}>
          enter master password to unlock connection keys
        </div>
        <div className={styles.inputWrapper}>
          <input className={styles.input} type="password"/>
        </div>
      </div>
    );
  }
 }
