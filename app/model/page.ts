import * as React from 'react';

export enum PageViewState {
  BACKGROUND,
  ENTERING,
  LEAVING,
  ACTIVE,
}

export interface IPageViewProps {
  state: PageViewState;
  title: string;
  tabId: string;
}

export type PageViewType = React.ComponentType<IPageViewProps>;

export interface IPage {
  id: string;
  view: PageViewType;
  state: PageViewState;
  tabId: string;
  title: string;
}

export interface ITab {
  id: string;
  displayText: string;
  alert: boolean;
  processing: boolean;
  pageStack: IPage[];
}
