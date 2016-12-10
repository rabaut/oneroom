import React, {Component, PropTypes} from 'react';

export default class Health extends Component {
  static defaultProps = { health: 100 };

  static propTypes = { health: PropTypes.number };

  render() {
    return (
      <div className="container">
        <div className="health" style={{width: `${this.props.health}%`}}>
          {this.props.health}/100
        </div>
      </div>
    );
  }
}
