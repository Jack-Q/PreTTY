import * as React from 'react';

import { INotification } from '../model/notification';
import { notificationServiceConnector, notificationService } from '../service/notification-service';

import * as styles from './notification-overlay.scss';
interface IProps {
  list: INotification[];
}
class NotificationOverlayView extends React.Component<IProps> {
  public render() {
    return (
      <div className={`${styles.container} ${this.props.list.length > 0 ? styles.active : ''}`}>
        {
          this.props.list.map((n) => (
            <div
              key={n.id}
              className={styles.notification}
              onClick={() => notificationService.processNotification(n)}>
              <div className={styles.label}>
                {n.message}
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

export const NotificationOverlay = notificationServiceConnector<IProps, {}>(
  (state, svc) => ({ list: state.list }),
  NotificationOverlayView,
);
