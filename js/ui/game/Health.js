import React, {Component, PropTypes} from 'react';

export default class Health extends Component {
  static defaultProps = { health: 100 };

  static propTypes = { health: PropTypes.number };

  renderHearts() {
    let hearts = [];
    for(let i=0; i < this.props.health; i++) {
      hearts.push(<img className="heart" />);
    }
    return hearts;
  }

  render() {
    return (
      <div className="container">
        {this.renderHearts()}
      </div>
    );
  }
}
