import { logger } from '../util/logger';
import { getUid } from '../util/uid';

export enum NotificationAction {
  DEFAULT, // click the notification message/block
  PRIMARY, // click primary button (ok, yes, etc)
  SECONDARY, // click secondary button (extra action)
  CANCELLATION, // click cancellation action, same as dismiss action or timeout
}

export interface INotification {
  id: string;
  message: string;
  tag: any;
  action: (tag: any, msg: string) => void;
}

const defaultAction = (tag: any, msg: string) => {
  logger.info('notification clicked: ' + msg);
};

export const createNotification =
  <T>(message: string, action: (tag: T, msg: string) => void = defaultAction, tag?: T): INotification => {
    return {
      id: getUid(), message, tag, action,
    };
  };
