import React, { Component } from 'react';
import { connect }          from 'react-redux'
import Welcome              from './welcome/welcome';
import Game                 from './game/game';

const mapStateToProps = state => ({
  started: state.game.started,
});

@connect(mapStateToProps)
export default class Root extends Component {
  render() {
    const { started } = this.props;
    if(started) { return (<Game />); }
    return (<Welcome />);
  }
}
