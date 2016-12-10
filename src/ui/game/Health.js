import React, {Component, PropTypes} from 'react';

export default class Health extends Component {
  static defaultProps = { health: 100 };

  static propTypes = { health: PropTypes.number };

  render() {
    return (
      <div id="health-container">
        <div id="health" style={{width: `${this.props.health}%`}}>
          {this.props.health}/100
        </div>
      </div>
    );
  }
}
