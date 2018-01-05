import * as React from 'react';

import * as styles from './dialog-overlay.scss';
import { Button } from '../component/button';
import { IDialog } from '../model/dialog';
import { dialogServiceConnector, dialogService } from '../service/dialog-service';

interface IProps {
  dialog?: IDialog;
}

class DialogOverlayView extends React.Component<IProps> {
  public render() {
    return (
      <div className={`${styles.container} ${this.props.dialog ? styles.active : ''}`}>
        {
          this.props.dialog &&
          <div className={styles.dialog}>
            <div className={styles.heading}>{this.props.dialog.title}</div>
            <div className={styles.message}>{this.props.dialog.message}</div>
            <div className={styles.actions}>
              {
                this.props.dialog.actions.map((a) => (
                  <Button label={a.title} tooltip={a.tooltip} key={a.title}
                    onClick={() => this.props.dialog &&
                      dialogService.handleDialogAction(this.props.dialog, a)} />
                ))
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

export const DialogOverlay = dialogServiceConnector<IProps, {}>(
  (state, svc) => ({ dialog: state.dialog }),
  DialogOverlayView,
);
