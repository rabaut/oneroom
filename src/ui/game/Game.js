import React, { Component } from 'react';
import { connect }          from 'react-redux'
import Power                from './power';
import Health               from './health';
import Menu                 from './menu';
import Dev                  from './dev';
import { 
  toggleVisibility, 
  setVisibility, 
} from 'client/modules/ui';

const mapStateToProps = state => ({
  visibility: state.ui.visibility,
  player: state.player,
  keybindings: state.api.user.settings.keybindings.ui,
});

const mapDispatchToProps = dispatch => ({
  toggleVisibility(key) {
    dispatch(toggleVisibility(key));
  },
  hideMenu() {
    dispatch(setVisibility({ menu: false }));
  },
  dispatch
});

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    window.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(event) {
    const { keybindings } = this.props;
    if(event.key === keybindings.toggleMenu) {
      this.props.toggleVisibility('menu');
    }
  }

  render() {
    const { visibility, ...props } = this.props;
    return (
      <div>
        {visibility.menu ? <Menu {...props} /> : ''}
        {visibility.dev ? <Dev {...props} /> : '' }
      </div>
    );
  }
}
