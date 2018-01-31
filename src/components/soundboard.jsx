import React from 'react';
import VibraphoneBoard from './vibraphone';
import DrumsBoard from './drums';

class Soundboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBeat: -1,
      timeout: null,
      tempo: 102,
      mm: 128,
    };
    this.handlePause = this.handlePause.bind(this);
    this.handleResume = this.handleResume.bind(this);
    this.toggleRunning = this.toggleRunning.bind(this);
    this.handleTempoChange = this.handleTempoChange.bind(this);
  }
    
  handleResume() {
    const timeoutCallback = () => {
      const nextBeat = this.state.currentBeat + 1 === this.state.mm
      ? 0 : this.state.currentBeat + 1;
      this.setState({ currentBeat: nextBeat });
      const timeout = setTimeout(timeoutCallback, this.state.tempo);
      this.setState({ timeout });
    };
    timeoutCallback();
  }
  
  handlePause() {
    clearTimeout(this.state.timeout);
    this.setState({ timeout: null });
  }
  
  toggleRunning() {
    if (this.state.timeout) {
      this.handlePause();
    } else {
      this.handleResume();
    }
  }
  
  handleTempoChange(e) {
    this.setState({ tempo: Number(e.target.value) });
  }
  
  render () {
    const startButton = this.state.timeout ? "pause" : "play";
    const tempo = Math.round(15000 / (this.state.tempo + 6));
    return (
      <div className="soundboard">
        <div className="soundboard-controls">
          <button className="soundboard-controls-start" onClick={this.toggleRunning}>
            <i className={`fa fa-${startButton}`} aria-hidden="true"></i>
          </button>
          <div className="soundboard-controls-tempo-container">
            <div className="soundboard-controls-tempo-title">Tempo: {tempo}</div>
            <input className="soundboard-controls-tempo-slider" type="range"
              min="30" max="180" step="1"
              value={this.state.tempo}
              onChange={this.handleTempoChange}/>
          </div>
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
