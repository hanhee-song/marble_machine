import React from 'react';

class Line extends React.Component {
  constructor(props) {
    super(props);
    // this.props.vibraphone;
    // this.props.mm;
    // this.props.note;
    // this.props.currentBeat;
    this.renderSquares = this.renderSquares.bind(this);
    this.state = {
      squares: {}
    };
  }
  
  renderSquares() {
    return this.props.vibraphone.getLine(this.props.note).map((bool, i) => {
      return (
        <div className="line-square"
          key={i}>
          s
        </div>
      );
    });
  }
  
  render () {
    return (
      <div className="line">
        {this.renderSquares()}
      </div>
    );
  }
}

export default Line;
