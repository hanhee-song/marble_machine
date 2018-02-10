import React from 'react';

class Line extends React.Component {
  constructor(props) {
    super(props);
    // this.props.mm;
    // this.props.currentBeat;
    
    // This line exists solely to act as an array
    // over which we can iterate
    this.state = {
      line: this.makeNewArray(this.props.mm),
    };
    this.renderSquares = this.renderSquares.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.mm !== nextProps.mm) {
      this.setState({ line: this.makeNewArray(nextProps.mm) });
    }
  }
  
  makeNewArray(n) {
    const arr = [];
    for (var i = 0; i < n; i++) {
      arr.push(null);
    }
    return arr;
  }
  
  renderSquares() {
    return this.state.line.map((_, i) => {
      const current = i === this.props.currentBeat ? "current" : "";
      return (
        <div className={`square ${current}`}
          key={i}>
        </div>
      );
    });
  }
  
  render () {
    // Don't remove the 'useless' divs or you break the css
    return (
      <div className="beat-slider">
        <div></div><div></div>
        {this.renderSquares()}
      </div>
    );
  }
}

export default Line;
