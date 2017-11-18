import * as React from 'react';
import { Terminal } from 'xterm';
import { Client } from 'ssh2';
let styles = require('./home.scss');

require('xterm/lib/addons/fit');
Terminal.loadAddon("fit");

enum ConnectionState {
  NO_CONNECT, CONNECTING, CONNECTED
}
export default class Home extends React.Component {
  private term: Terminal = new Terminal({cursorBlink: true, cursorStyle: 'bar'});
  private termContainer: HTMLElement;
  private connection: Client = new Client();
  private connectionState: ConnectionState = ConnectionState.NO_CONNECT;
  private logMessage: string = "";
  log(message: string) {
    this.logMessage += message;
    this.forceUpdate();
  }

  componentDidMount() {
    this.term.open(this.termContainer);
    (this.term as any).fit();

    this.term.write("Hello World");
    
    // handle resize
    window.addEventListener('resize', () => {
      (this.term as any).fit();
    })
  }

  establishConnection() { 
    this.connectionState = ConnectionState.CONNECTING;
    this.connection.on('banner', banner => this.term.write(banner));
    this.connection.on('greeting', msg => this.log('GREETING: ' + msg));
    this.connection.on('error', err => this.log('ERROR: ' + err.message));
    this.connection.on('ready', () => {
      this.connectionState = ConnectionState.CONNECTED;
      console.log("connection ready");
      this.setUpShell();
    })
    this.connection.connect({
      host: '127.0.0.1',
      username: 'jackq',
      password: ''
    });
  }

  setUpShell() {
    this.connection.shell({
      cols: this.term.cols,
      rows: this.term.rows,
    }, {
      x11: false
    }, (err, stream) => {
      if (err) {
        this.log(err.name + ':' + err.message);
        return;
      }
      console.log('pipe data together')
      stream.on('data', (data: string) => this.term.write((data as any as Buffer).toString("utf-8") || ""));
      this.term.on('data', (data) => stream.write(data || ""));
    })
  }

  componentWillUnmount() {
  }
  render() {
    return (
      <div className={styles.container} data-tid="container">
        <h2>Hello PreTTY: {this.connectionState}</h2>
        <div className="actions">
          <button onClick={() => this.term.reset()}>Reset</button>
          <button onClick={() => this.term.writeln("")}>New Line</button>
          <button onClick={() => this.establishConnection()}>Connect</button>
        </div>
        <div className="term-container" ref={r => { if (r) this.termContainer = r }}></div>
        <pre className="log-message">{this.logMessage}</pre>
      </div>
    );
  }
}
