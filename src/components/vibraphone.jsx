import React from 'react';
import Vibraphone from '../classes/vibraphone';
import Line from './line';

class VibraphoneBoard extends React.Component {
  constructor(props) {
    super(props);
    // this.props.currentBeat;
    // this.props.mm;
    this.vibraphone = new Vibraphone(this.props.mm);
    this.notes = ["b2", "c2", "d2", "e2",
    "fs2", "g3", "a3", "b3", "c3", "d3", "e3"].reverse();
    this.renderLines = this.renderLines.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.currentBeat !== nextProps.currentBeat) {
      this.vibraphone.play(nextProps.currentBeat);
    }
  }
  
  renderLines() {
    return this.notes.map((note) => {
      return (
        <Line note={note}
          instrument={this.vibraphone}
          key={note}
          mm={this.props.mm}
          currentBeat={this.props.currentBeat} />
      );
    });
  }
  
  render () {
    return (
      <div className="vibraphone">
        {this.renderLines()}
      </div>
    );
  }
}

export default VibraphoneBoard;
