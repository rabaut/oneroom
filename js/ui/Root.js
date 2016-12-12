import React, { Component } from 'react';
import Welcome              from './welcome/welcome';
import Game                 from './game/game';

export default class Root extends Component {
  render() {
    if(true) { return (<Game {...this.props} />); }
    return (<Welcome />);
  }
}
