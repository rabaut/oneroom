import React, { Component } from 'react';

export default class Welcome extends Component {
  render() {
    return (
      <div className="container">
        <Spinner />
        <div id="banner">
          Welcome to one room
      </div>
    );
  }
}
