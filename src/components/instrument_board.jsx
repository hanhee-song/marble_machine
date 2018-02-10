import React from 'react';
import Line from './line';

class DrumsBoard extends React.Component {
  constructor(props) {
    super(props);
    // this.props.currentBeat;
    // this.props.mm;
    // this.props.instrument
    // this.props.instrument.allNotes()
    this.renderLines = this.renderLines.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.currentBeat !== nextProps.currentBeat && nextProps.currentBeat !== -1) {
      this.props.instrument.playAtBeat(nextProps.currentBeat);
    }
  }
  
  renderLines() {
    return this.props.instrument.allNotes().map((note) => {
      return (
        <Line note={note}
          instrument={this.props.instrument}
          key={note}
          mm={this.props.mm}
          currentBeat={this.props.currentBeat} />
      );
    });
  }
  
  render () {
    return (
      <div className="instrument">
        {this.renderLines()}
      </div>
    );
  }
}

export default DrumsBoard;
