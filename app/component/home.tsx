import * as React from 'react';
import { Client, ClientChannel } from 'ssh2';
import * as Terminal from 'xterm';
import * as styles from './home.scss';
// const styles = {} as any;

// tslint:disable-next-line:no-var-requires
require('xterm/lib/addons/fit');
(Terminal as any).loadAddon('fit');

enum ConnectionState {
  NO_CONNECT, CONNECTING, CONNECTED,
}

interface IHomeState {
  connectionState: ConnectionState;
  logMessage: string;
  host: string;
  port: number;
  userName: string;
  password: string;
}

export class Home extends React.Component<{}, IHomeState> {
  private termContainer: HTMLElement;
  private connection: Client = new Client();
  private term = new Terminal({ cursorBlink: true /* , cursorStyle: 'bar' */ });
  private connectionStream?: ClientChannel;

  constructor(props: {}, state: IHomeState) {
    super(props);
    this.state = {
      connectionState: ConnectionState.NO_CONNECT,
      logMessage: '',
      host: 'localhost',
      port: 22,
      userName: '',
      password: '',
    };

    this.connection.on('banner', (banner) => this.term.write(banner));
    this.connection.on('greeting', (msg) => this.log('GREETING: ' + msg));
    this.connection.on('error', (err) => {
      this.log('ERROR: ' + err.message);
      this.setState({ connectionState: ConnectionState.NO_CONNECT });
    });
    this.connection.on('ready', () => {
      this.setState({ connectionState: ConnectionState.CONNECTED });
      this.setUpShell();
    });

    this.term.on('resize', (data) => data && this.connectionStream &&
      this.connectionStream.setWindow(data.rows, data.cols, data.rows, data.cols));
    this.term.on('data', (data) => data && this.connectionStream &&
      this.connectionStream.write(data));
  }

  public log(message: string = '') {
    this.setState({ logMessage: this.state.logMessage + message + '\n' });
  }

  public componentDidMount() {
    this.term.open(this.termContainer);
    (this.term as any).fit();

    this.term.write('Hello World, please connect to server');

    // handle resize
    window.addEventListener('resize', () => {
      (this.term as any).fit();
    });
  }

  public establishConnection() {
    this.setState({ connectionState: ConnectionState.CONNECTING });
    this.connection.connect({
      host: this.state.host,
      port: this.state.port,
      username: this.state.userName,
      password: this.state.password,
    });
  }

  public setUpShell() {
    this.connection.shell({
      cols: this.term.cols,
      rows: this.term.rows,
    }, {
      x11: false,
    }, (err, stream) => {
      if (err) {
        this.log('ERROR: ' + err.message);
        this.setState({ connectionState: ConnectionState.NO_CONNECT });
        this.connection.destroy();
        return;
      }
      stream.on('data', (data: string) => this.term.write((data as any as Buffer).toString('utf-8') || ''));
      stream.on('close', () => {
        this.term.writeln('\r\n\r\nConnection to remote server is closed');
        this.setState({ connectionState: ConnectionState.NO_CONNECT });
        this.connectionStream = undefined;
      });

      this.connectionStream = stream;
    });
  }

  public disposeConnection() {
    if (this.connectionStream) {
      this.connectionStream.close();
      this.connection.destroy();
    }
  }

  // public componentWillUnmount() {}

  public render() {
    return (
      <div className={styles.container} data-tid="container">
        <h2>Hello PreTTY: {ConnectionState[this.state.connectionState]}</h2>
        {
          this.state.connectionState === ConnectionState.NO_CONNECT ? (
            <div className="auth-info">
              <label>
                Host:
                <input type="text" value={this.state.host}
                  onChange={(e) => this.setState({ host: e.target.value })} />
              </label>
              <label>
                Port:
                <input type="number" value={this.state.port}
                  onChange={(e) => this.setState({ port: parseInt(e.target.value, 10) })} />
              </label>
              <label>
                User Name:
                <input type="text" value={this.state.userName}
                  onChange={(e) => this.setState({ userName: e.target.value })} />
              </label>
              <label>
                Password:
                <input type="password" value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })} />
              </label>
            </div>
          ) : (
            <div>
                {this.state.connectionState === ConnectionState.CONNECTING ? 'Connecting ' : 'Connected '}
                to <code>{this.state.userName}@{this.state.host}:{this.state.port}</code>.
            </div>
          )
        }
        <div className="actions">
          <button onClick={() => this.term.reset()}>Reset</button>
          <button onClick={() => this.term.writeln('')}>New Line</button>
          {
            this.state.connectionState === ConnectionState.CONNECTED ?
              <button onClick={() => this.disposeConnection()}>Disconnect</button> :
              <button onClick={() => this.establishConnection()}
                disabled={this.state.connectionState === ConnectionState.CONNECTING}>Connect</button>
          }
        </div>
        <div className={styles.termContainer} ref={(r) => { if (r) { this.termContainer = r; } }}></div>
        <pre className={styles.logMessage}>{this.state.logMessage}</pre>
      </div>
    );
  }
}
