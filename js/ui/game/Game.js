import React, { Component } from 'react';
import Health               from './health';
import Menu                 from './menu';
import Dev                  from './dev';
import { bindings }         from '../../keyboard';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    window.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(event) {
    if(event.key === bindings.ui.toggleMenu) {
      //this.props.toggleVisibility('menu');
    }
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}
