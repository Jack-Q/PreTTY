import * as React from 'react';

import { quickActionService, actionService } from '../service';
import * as styles from './quick-action-overlay.scss';
import { IApplicationAction } from '../model/action';
import { quickActionServiceConnector } from '../service/quick-action-service';

interface IPropsType {
  // display or hide this overlay
  isOpen: boolean;
  actionList: IApplicationAction[];
  query: string;
}

class QuickActionOverlayView extends React.Component<IPropsType> {

  public render() {
    return (
      <div className={`${styles.background} ${this.props.isOpen ? styles.active : ''}`}
        onClick={(e) => this.handleBackgroundClick(e)}>
        <div className={styles.panel}>
          <input type="text" value={this.props.query} placeholder={'查找'}
            onKeyPress={(e) => this.handleKeyEvent(e)}
            onChange={(e) => quickActionService.updateFilter(e.target.value)} />
        </div>
        <div className={styles.options}>
          {
            this.props.actionList.map((a) => {
              return (
<<<<<<< HEAD
                <div className={styles.actionOption}>{a.displayName}</div>
=======
                <div onClick={() => this.handleAction(a)}>{a.displayName}</div>
>>>>>>> a35fbaec5e59e8c816feb44fb8a6ffb943079c9d
              );
            })
            
          }
        </div>
      </div>
    );
  }

  private handleAction(a: IApplicationAction) {
    actionService.executeAction(a);
  }

  private handleKeyEvent(e: React.KeyboardEvent<HTMLInputElement>) {
    // TODO: handle up, down, enter, home, end, etc
    // TODO: handle ESC to close
  }

  private handleBackgroundClick(e: React.MouseEvent<HTMLDivElement>) {
    // ignore bubbled events
    if (e.target !== e.currentTarget) {
      return;
    }
    quickActionService.closeQuickAction();
  }
}

export const QuickActionOverlay = quickActionServiceConnector<IPropsType, {}>((state, svc) => ({
  isOpen: state.isPanelOpen,
  actionList: state.filterResult.map((r) => r.action),
  query: state.filterQuery,
}), QuickActionOverlayView);
