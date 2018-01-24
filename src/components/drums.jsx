import React from 'react';
import Drums from '../classes/drums';
import Line from './line';

class DrumsBoard extends React.Component {
  constructor(props) {
    super(props);
    // this.props.currentBeat;
    // this.props.mm;
    this.drums = new Drums(this.props.mm);
    this.notes = ["kick", "snare", "bass", "crash"];
    this.renderLines = this.renderLines.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.currentBeat !== nextProps.currentBeat) {
      this.drums.play(this.props.currentBeat);
    }
  }
  
  renderLines() {
    return this.notes.map((note) => {
      return (
        <Line note={note}
          instrument={this.drums}
          key={note}
          mm={this.props.mm}
          currentBeat={Math.floor(this.props.currentBeat / 2)} />
      );
    });
  }
  
  render () {
    return (
      <div>
        drums
      </div>
    );
  }
}

export default DrumsBoard;
