import { AbstractApplicationService, IApplicationService } from '../model/service';
import { getServiceConnector } from '../util/connect-to-service';
import { INotification, NotificationAction } from '../model/notification';

interface IStateEvent {
  list: INotification[];
}

class NotificationService extends AbstractApplicationService<IStateEvent> implements IApplicationService<IStateEvent> {
  private activeList: INotification[] = [];

  public pushNotification(notification: INotification) {
    this.activeList.unshift(notification);
    this.updateState();
  }

  public removeNotification(notification: INotification) {
    const index = this.activeList.indexOf(notification);
    if (index === -1) { return; }
    this.activeList.splice(index, 1);
    this.updateState();
  }

  public processNotification(notification: INotification) {
    const index = this.activeList.indexOf(notification);
    if (index === -1) {
      return;
    }
    this.executeNotificationAction(notification, NotificationAction.DEFAULT);
  }

  public getState(): IStateEvent {
    return {
      list: this.activeList,
    };
  }

  private executeNotificationAction(notification: INotification, action: NotificationAction) {
    if (action === NotificationAction.PRIMARY) {
      notification.action(notification.tag, notification.message);
    }
    // TODO: handle more action type
    this.removeNotification(notification);
  }
}

export const notificationService = new NotificationService();
export const notificationServiceConnector = getServiceConnector<IStateEvent, NotificationService>(notificationService);
