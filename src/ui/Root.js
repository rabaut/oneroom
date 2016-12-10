import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAuthenticated, getLoaded } from 'client/selectors';
import Welcome from './welcome/welcome';
import Home    from './home/home';
import Game    from './game/game';
import Spinner from './util/spinner';

const mapStateToProps = state => ({
  authenticated: getAuthenticated(state),
  started: state.game.started,
  loaded: getLoaded(state)
});


@connect(mapStateToProps)
export default class Root extends Component {
  render() {
    const { authenticated, started, loaded } = this.props;
    if(authenticated) {
      if(!loaded) { return (<Spinner />); }
      if(!started) { return (<Home />); }
      return (<Game />);
    }
    return (<Welcome />);
  }
}
