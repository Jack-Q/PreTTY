import * as React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        {this.props.children}
      </div>
    );
  }
}
