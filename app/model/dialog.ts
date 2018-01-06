import { getUid } from '../util/uid';
import { logger } from '../util/logger';
export interface IDialogAction {
  title: string;
  tooltip?: string;
  action: () => void;
}

export interface IDialog {
  id: string;
  title: string;
  message: string;
  actions: IDialogAction[];
}

export const createDialog = (title: string, message: string, actions: IDialogAction[] = [{
  title: 'OK',
  action: () => { logger.verbose('dialog closed'); },
}]) => {
  return {
    id: getUid(),
    title,
    message,
    actions,
  };
};
