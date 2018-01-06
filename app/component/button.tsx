import * as React from 'react';

import * as styles from './button.scss';

interface IProps {
  label: string;
  tooltip?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  disabled?: boolean;
  focused?: boolean;
}

interface IState {
  showTooltip: boolean;
}

const initialState: IState = {
  showTooltip: false,
};

export class Button extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props, state);
    this.state = initialState;
  }

  public render() {
    const isFocused = this.props.focused === true;
    return (
      <div className={isFocused ? styles.currentBtn : styles.button} onClick={this.props.disabled ? undefined : this.props.onClick}>
        <div className={styles.label}>{this.props.label}</div>
        {this.props.tooltip && <div className={styles.tooltip}>{this.props.tooltip}</div>}
      </div>
    );
  }
}
