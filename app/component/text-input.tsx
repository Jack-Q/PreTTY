import * as React from 'react';
import * as styles from './text-input.scss';

interface IProps {
  value: string;
  label: string;
  isPassword?: boolean;
  helpMessage?: string;
  onChange: (v: string) => void;
}

interface IState {
  isActive: boolean;
}

const initialState: IState = {
  isActive: false,
};

export class TextInput extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = initialState;
  }

  public render() {
    return (
      <div className={styles.container}>
        <div
          className={`${styles.label} ${this.state.isActive ? styles.active : ''}`}
        >{this.props.label}</div>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            type={this.props.isPassword ? 'password' : 'text'}
            value={this.props.value}
            onChange={(e) => this.props.onChange(e.target.value)}
            onFocus={() => this.setState({ isActive: true })}
            onBlur={() => this.setState({ isActive: false })}
          />
        </div>
        {
          this.props.helpMessage &&
          <div className={styles.inputHelp}>
            <div className={styles.helpIcon}>
              <i className="material-icons">help</i>
            </div>
            <div className={styles.helpMessage}>
              {this.props.helpMessage}
            </div>
          </div>
        }
      </div>
    );
  }
}
