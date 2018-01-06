import * as React from 'react';

import * as styles from './dialog-overlay.scss';
import { Button } from '../component/button';
import { IDialog } from '../model/dialog';
import { dialogServiceConnector, dialogService } from '../service/dialog-service';
import {translateAcceleratorKeyCode} from '../util/key-code';


interface IProps {
  dialog?: IDialog;
}
interface IState {
  currentIndex: number;
}

const initialState: IState = {
  currentIndex: 0,
};

class DialogOverlayView extends React.Component<IProps, IState> {
  private keyEventHandlerRef: (e:KeyboardEvent) => void;

  constructor(props: IProps) {
    super(props);
    
    this.state = initialState;
  }

  componentWillReceiveProps(nextProps: IProps) {
    if(!this.props.dialog && nextProps.dialog) {
      this.keyEventHandlerRef = this.keyEventHandlerRef || ((e: KeyboardEvent) => this.handleKeyEvent(e));
      document.addEventListener('keydown', this.keyEventHandlerRef);
    }
    if(this.props.dialog && !nextProps.dialog) {
      document.removeEventListener('keydown', this.keyEventHandlerRef);
    }
  }

  public render() {
    return (
      <div
        className={`${styles.container} ${this.props.dialog ? styles.active : ''}`}>
        {
          this.props.dialog &&
          <div className={styles.dialog}>
            <div className={styles.heading}>{this.props.dialog.title}</div>
            <div className={styles.message}>{this.props.dialog.message}</div>
            <div className={styles.actions}>
              {
                this.props.dialog.actions.map((a, i) => (
                  <Button focused={this.state.currentIndex === i ? true : false} label={a.title} tooltip={a.tooltip} key={a.title}
                    onClick={() => this.props.dialog &&
                      dialogService.handleDialogAction(this.props.dialog, a)} />
                ))
              }
            </div>
          </div>
        }
      </div>
    );
  }

  

  private handleKeyEvent(e: KeyboardEvent) {
    if(!this.props.dialog) {
      return;
    }
    let len: number =  this.props.dialog.actions.length;
    switch(e.keyCode) {
      case translateAcceleratorKeyCode("Enter"):
      dialogService.handleDialogAction(this.props.dialog,this.props.dialog.actions[this.state.currentIndex]);
      break;
      case translateAcceleratorKeyCode('Tab'):
      this.setState({currentIndex: (this.state.currentIndex + 1) % len})
      break;
    }
  } 

}

export const DialogOverlay = dialogServiceConnector<IProps, {}>(
  (state, svc) => ({ dialog: state.dialog }),
  DialogOverlayView,
);
