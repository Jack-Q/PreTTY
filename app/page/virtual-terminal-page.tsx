import * as React from 'react';

import * as styles from './virtual-terminal-page.scss';
import { IPageViewProps } from '../model/page';

export class VirtualTerminalPage extends React.Component<IPageViewProps> {
  public render() {
    return (
      <div className={styles.container}>
        Virtual Terminal Page
      </div>
    );
  }
 }
