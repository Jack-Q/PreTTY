import * as React from 'react';
import { Terminal } from 'xterm';
let styles = require('./home.scss');

require('xterm/lib/addons/fit');
Terminal.loadAddon("fit");

export default class Home extends React.Component {
  private term: Terminal = new Terminal({cursorBlink: true, cursorStyle: 'bar'});
  private termContainer: HTMLElement;


  componentDidMount() {
    this.term.open(this.termContainer);
    (this.term as any).fit();

    this.term.write("Hello World");
    this.term.on('data', (data) => {
      console.log('terminal data', data);
      this.term.write(data || "");
    });
    
    // handle resize
    window.addEventListener('resize', () => {
      (this.term as any).fit();
    })
  }

  componentWillUnmount() {
  }
  render() {
    return (
      <div className={styles.container} data-tid="container">
        <h1>Hello PreTTY</h1>
        <div className="actions">
          <button onClick={() => this.term.reset()}>Reset</button>
          <button onClick={() => this.term.writeln("")}>New Line</button>
        </div>
        <div className="term-container" ref={r => {if (r) this.termContainer = r } }></div>
      </div>
    );
  }
}
