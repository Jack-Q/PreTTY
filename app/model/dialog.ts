import { getUid } from '../util/uid';
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

export const createDialog = (title: string, message: string, actions: IDialogAction[]) => {
  return {
    id: getUid(),
    title,
    message,
    actions,
  };
};
