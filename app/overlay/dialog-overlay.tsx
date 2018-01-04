import * as React from 'react';

import * as styles from './dialog-overlay.scss';
import { Button } from '../component/button';

export class DialogOverlay extends React.Component {
  public render() {
    return (
      <div className={`${styles.container} ${styles.active}`}>
        <div className={styles.dialog}>
          <div className={styles.heading}>{'Security Warning'}</div>
          <div className={styles.message}>{'Content of the dialog'}</div>
          <div className={styles.actions}>
            <Button label="OK" />
            <Button label="Cancel" />
          </div>
        </div>
      </div>
    );
  }
}
