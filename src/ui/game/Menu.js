import React, {Component} from 'react';

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.handleSettings = this.handleSettings.bind(this);
    this.handleMain = this.handleMain.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleExit = this.handleExit.bind(this);

    this.state = {
      active: 'MAIN'
    }
  }

  handleSettings() {
    this.setState({active: 'SETTINGS'});
  }

  handleMain() {
    this.setState({active: 'MAIN'});
  }

  handleLogout() {
    this.handleExit();
  }

  handleExit() {
    this.props.hideMenu();
  }

  render() {
    let active = null;
    if(this.state.active === 'MAIN') {
      active = (<Main
        onSettings={this.handleSettings}
        onLogout={this.handleLogout}
        onExit={this.handleExit} />
      );
    } else if(this.state.active === 'SETTINGS') {
      active = (<Settings
        onMain={this.handleMain} />
      );
    }
    return (
      <div id="menu-container">
        <div id="menu">
        {active}
        </div>
      </div>
    );
  }
}

const Main = props => (
  <div id="menu-main">
    <button onClick={props.onSettings}>Settings</button>
    <button onClick={props.onLogout}>Log Out</button>
    <button onClick={props.onExit}>Exit</button>
  </div>
);

const Settings = props => (
  <div id="menu-settings">
    <button onClick={props.onMain}>Main</button>
  </div>
)
