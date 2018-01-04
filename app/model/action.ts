export interface IAccelerator {
  keyCode: string;
  withShift: boolean;
  withCtrl: boolean;
  withMeta: boolean;
  withAlt: boolean;
}

export interface IApplicationAction {
  key: string;
  displayName: string;
  description: string;
  internalAction: string;
  accelerator?: IAccelerator;
  getParams?: () => any;
}
