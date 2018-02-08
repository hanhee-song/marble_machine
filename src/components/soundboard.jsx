import React from 'react';
import Drums from '../classes/drums';
import Vibraphone from '../classes/vibraphone';
import InstrumentBoard from './instrument_board';

class Soundboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBeat: -1,
      timeout: null,
      tempo: 204,
      mm: 64,
      instruments: [
        new Vibraphone(64),
        new Drums(64)
      ]
    };
    this.handlePause = this.handlePause.bind(this);
    this.handleResume = this.handleResume.bind(this);
    this.toggleRunning = this.toggleRunning.bind(this);
    this.handleTempoChange = this.handleTempoChange.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleResetAll = this.handleResetAll.bind(this);
    this.handleMmChange = this.handleMmChange.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
  }
    
  handleResume() {
    const timeoutCallback = () => {
      const nextBeat = this.state.currentBeat + 1 >= this.state.mm
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
  
  handleStop(e) {
    this.handlePause();
    this.setState({ currentBeat: -1 });
  }
  
  handleResetAll(e) {
    this.handlePause();
    this.setState({
      currentBeat: -1,
      timeout: null,
      tempo: 204,
      mm: 64,
    });
    this.state.instruments.forEach((instrument) => {
      instrument.clearAllNotes();
    });
  }
  
  handleMmChange(e) {
    const input = e.target.value;
    if (input == parseInt(input)) {
      this.setState({ mm: parseInt(input) });
      this.state.instruments.forEach((instrument) => {
        instrument.setMm(parseInt(input));
      });
    }
  }
  
  handleUndo(e) {
    const instrumentUndos = {};
    this.state.instruments.forEach((instrument) => {
      const mostRecent = instrument.getMostRecentHistory();
      if (mostRecent) {
        instrumentUndos[mostRecent] = instrument;
      }
    });
    const keys = Object.keys(instrumentUndos).map(time => Number(time));
    const max = Math.max.apply(null, keys);
    const mostRecentInstrument = instrumentUndos[max];
    if (mostRecentInstrument) {
      mostRecentInstrument.historyPop();
    }
  }
  
  render () {
    const startButton = this.state.timeout ? "pause" : "play";
    const tempo = Math.round(30000 / (this.state.tempo + 12));
    return (
      <div className="soundboard">
        <div className="soundboard-controls">
          <button className="soundboard-controls-button" onClick={this.toggleRunning}>
            <i className={`fa fa-${startButton}`} aria-hidden="true"></i>
          </button>
          <button className="soundboard-controls-button" onClick={this.handleStop}>
            <i className={`fa fa-stop`} aria-hidden="true"></i>
          </button>
          <button className="soundboard-controls-button" onClick={this.handleUndo}>
            <i className={`fa fa-undo`} aria-hidden="true"></i>
          </button>
          <button className="soundboard-controls-button" onClick={this.handleResetAll}>
            <i className={`fa fa-refresh`} aria-hidden="true"></i>
          </button>
          <input className="sounboard-controls-input"
            onChange={this.handleMmChange}
            value={this.state.mm}
            />
          <div className="soundboard-controls-tempo-container">
            <div className="soundboard-controls-tempo-title">Tempo: {tempo}</div>
            <input className="soundboard-controls-tempo-slider" type="range"
              min="60" max="360" step="1"
              value={this.state.tempo}
              onChange={this.handleTempoChange}/>
          </div>
        </div>
        <div className="soundboard-instruments">
          <InstrumentBoard
            currentBeat={this.state.currentBeat}
            mm={this.state.mm}
            instrument={this.state.instruments[0]} />
          <InstrumentBoard
            currentBeat={this.state.currentBeat}
            mm={this.state.mm}
            instrument={this.state.instruments[1]} />
        </div>
      </div>
    );
  }
}

export default Soundboard;
