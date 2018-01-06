import * as React from 'react';

import { quickActionService, actionService } from '../service';
import * as styles from './quick-action-overlay.scss';
import { IApplicationAction } from '../model/action';
import { quickActionServiceConnector } from '../service/quick-action-service';
import {translateAcceleratorKeyCode} from '../util/key-code'

interface IPropsType {
  // display or hide this overlay
  isOpen: boolean;
  actionList: IApplicationAction[];
  query: string;
}

interface IState {
  currentIndex: number;
}

const initialState: IState = {
  currentIndex: 0,
};

class QuickActionOverlayView extends React.Component<IPropsType, IState> {
  private inputRef: HTMLInputElement;

  constructor(props: IPropsType) {
    super(props);
    this.state = initialState;
  }

  public componentWillReceiveProps(nextProps: IPropsType) {
    if (nextProps.isOpen && !this.props.isOpen) {
      setImmediate(() => this.inputRef && this.inputRef.focus());
    }
    if (!nextProps.isOpen && this.props.isOpen) {
      setImmediate(() => this.inputRef && this.inputRef.blur());
    }
  }

  public render() {
    return (
      <div 
      style={{userFocus: true}}
      onKeyDown={(e) => this.handleKeyEvent(e)}
      className={`${styles.background} ${this.props.isOpen ? styles.active : ''}`}
        onClick={(e) => this.handleBackgroundClick(e)}>
        <div className={styles.panel}>
          <input
            type="text"
            value={this.props.query}
            placeholder={'input to filter'}
            ref={(r) => r && (this.inputRef = r)}
            onChange={(e) => quickActionService.updateFilter(e.target.value)} />
        </div>
        <div className={styles.options}>
          {
            this.props.actionList.map((a, i) => {
              return (
                <div key={a.key} className={this.state.currentIndex === i ? styles.actionOptionFocus : styles.actionOption} onClick={() => this.handleAction(a)} >
                  {a.displayName}
                </div>
              );
            })
          }
          {
            this.props.actionList.length === 0 &&
            <div className={`${styles.actionOption} ${styles.empty}`}>
              No match command found.
            </div>
          }
        </div>
      </div>
    );
  }

  private handleAction(a: IApplicationAction) {
    quickActionService.closeQuickAction();
    actionService.executeAction(a);
  }

  private handleKeyEvent(e: React.KeyboardEvent<Element>) {
    if(!this.props.isOpen) {return;}
    const len = this.props.actionList.length;
    // TODO: handle up, down, enter, home, end, etc
    switch (e.keyCode) {
      case translateAcceleratorKeyCode("Up"):
        this.setState({currentIndex: (this.state.currentIndex + len - 1) % len})
      break;
      case translateAcceleratorKeyCode("Down"):
      this.setState({currentIndex: (this.state.currentIndex + 1) % len})
      
      break;
      case translateAcceleratorKeyCode("Enter"):
      this.handleAction(this.props.actionList[this.state.currentIndex]);
      break;
    }
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
