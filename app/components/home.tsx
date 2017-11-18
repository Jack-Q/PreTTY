import * as React from 'react';

let styles = require('./home.scss');

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          Hello PreTTY  
        </div>
      </div>
    );
  }
}
