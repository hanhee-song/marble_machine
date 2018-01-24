import React from 'react';
import VibraphoneBoard from './vibraphone';
import DrumsBoard from './drums';

class Soundboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBeat: -1,
      interval: null,
      tempo: 105,
      mm: 128,
    };
    this.handlePause = this.handlePause.bind(this);
    this.handleResume = this.handleResume.bind(this);
    this.toggleRunning = this.toggleRunning.bind(this);
  }
    
  handleResume() {
    const interval = setInterval(() => {
      const nextBeat = this.state.currentBeat + 1 === this.state.mm
      ? 0 : this.state.currentBeat + 1;
      this.setState({ currentBeat: nextBeat });
    }, this.state.tempo);
    this.setState({ interval });
  }
  
  handlePause() {
    clearInterval(this.state.interval);
    this.setState({ interval: null });
  }
  
  toggleRunning() {
    if (this.state.interval) {
      this.handlePause();
    } else {
      this.handleResume();
    }
  }
  
  render () {
    const startButton = this.state.interval ? "pause" : "play";
    return (
      <div className="soundboard">
        <div className="soundboard-controls">
          <button className="soundboard-controls-start" onClick={this.toggleRunning}>
            <i className={`fa fa-${startButton}`} aria-hidden="true"></i>
          </button>
        </div>
        <div className="soundboard-instruments">
          <VibraphoneBoard currentBeat={this.state.currentBeat} mm={this.state.mm} />
          <DrumsBoard currentBeat={this.state.currentBeat} mm={this.state.mm} />
        </div>
      </div>
    );
  }
}

export default Soundboard;
