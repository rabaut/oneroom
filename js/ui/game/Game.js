import React, { Component } from 'react';
import { connect }          from 'react-redux'
import Health               from './health';
import Menu                 from './menu';
import Dev                  from './dev';
import { bindings }         from '../../keyboard';
import { 
  toggleVisibility, 
  setVisibility, 
} from '../../modules/ui';

const mapStateToProps = state => ({
  visibility: state.ui.visibility,
  player: state.player,
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

@connect(mapStateToProps, mapDispatchToProps)
export default class Game extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    window.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(event) {
    if(event.key === bindings.ui.toggleMenu) {
      this.props.toggleVisibility('menu');
    }
  }

  render() {
    const { visibility, ...props } = this.props;
    return (
      <div>
        {visibility.menu ? <Menu {...props} /> : ''}
        {visibility.dev  ? <Dev {...props} /> : ''}
      </div>
    );
  }
}
