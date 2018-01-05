export interface IAccelerator {
  keyCode: string;
  withShift: boolean;
  withCtrl: boolean;
  withMeta: boolean;
  withAlt: boolean;
}

export interface IApplicationAction<T = any> {
  key: string;
  displayName: string;
  description: string;
  accelerator?: IAccelerator;
  getParams?: () => T;
}

export interface IApplicationActionClass<T = any> {
  actionBody: (params: T) => void;
}
