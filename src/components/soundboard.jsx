import React from 'react';
import Drums from '../classes/drums';
import Vibraphone from '../classes/vibraphone';
import InstrumentBoard from './instrument_board';
import { compress, decompress, encodeBase64, decodeBase64 } from 'lzutf8';
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
    this.handleExport = this.handleExport.bind(this);
    // this.handleImport = this.handleImport.bind(this);
    this.importData = this.importData.bind(this);
  }
  
  componentDidMount() {
    let compressedString = this.props.location.pathname.slice(1) || "eyJ0ZW1wbyI6MjA0LCJtbSI6NjQsImluc3RydW1lbnRzIjp7IlZpYnJhcGhvbmUiOiJbW10sxANcIjJlXCIsXCIyYlwixRAzxgnZH2HICWfQEtpKzy7EJdAsZM52ZNhL1h/7AJXPKzJmc/sAltBY7wCWxDzUJ+8Antgnxk5cIjNjzjnbM+YAx/8ArcdEZcosMshixxXMa8kJySTpAJj7AKHJG/gAksYJxG9dIiwiRHJ1bXPlAmhcImtpY2vHIGhhdMcKc25hcusAscYkLMoi3yXVJddryxXHLNBD1Tffff8Aotsl/ACa1kb/AKLffdMl2Gf9AIbfNfgA3NtN+QEZxxks0Ef1Aez3Adr/ATVdIn19";
    try {
      this.importData(JSON.parse(decompress(decodeBase64(compressedString))));
    }
    catch(err) {
      this.props.history.push("/");
    }
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
    // Hash of { timestamps: [inst, inst] }
    const instrumentUndos = {};
    
    // I use an array because a simultaneous change (namely, hitting
    // that undo button) may result in the same timestamp for multiple instruments
    this.state.instruments.forEach((instrument) => {
      const mostRecent = instrument.getMostRecentHistory();
      if (mostRecent) {
        if (instrumentUndos[mostRecent]) {
          instrumentUndos[mostRecent].push(instrument);
        } else {
          instrumentUndos[mostRecent] = [instrument];
        }
      }
    });
    
    // We're going to put in here the most recent timestamp's instruments
    // plus we'll check the other timestamps to see if they're within
    // about 10 miliseconds
    let instrumentsToReverse = [];
    
    // Get the most recent timestamp, put those instruments in the arr
    const keys = Object.keys(instrumentUndos).map(time => Number(time));
    const max = Math.max.apply(null, keys);
    instrumentsToReverse = instrumentsToReverse.concat(instrumentUndos[max]);
    
    // Iterate over all keys, put anything within 10 miliseconds in the arr
    keys.forEach(timestamp => {
      if (max - timestamp < 10) {
        let instruments = instrumentUndos[timestamp];
        instrumentsToReverse = instrumentsToReverse.concat(instruments);
      }
    });
    
    if (instrumentsToReverse.length > 0) {
      instrumentsToReverse.forEach(instrument => {
        instrument.historyPop();
      });
    }
  }
  
  handleExport(e) {
    // I want to pass on tempo, mm, and each instrument's json
    const instruments = {};
    this.state.instruments.forEach(inst => {
      // Set ourselves up for some sweet high-level programming
      // never mind, I was going to do some fancy shmancy name eval
      // but realized I don't want to instantiate new instances
      const name = inst.constructor.name;
      instruments[name] = inst.exportJSON();
    });
    
    const data = JSON.stringify({
      tempo: this.state.tempo,
      mm: this.state.mm,
      instruments: instruments,
    });
    const compressedString = encodeBase64(compress(data));
    this.props.history.push("/" + compressedString);
  }
  
  // handleImport(e) {
  //   e.preventDefault();
  //   this.handleStop(); // reset currentBeat and timeout
  //
  //   const data = JSON.parse(e.target.value);
  //   this.setState({
  //     tempo: data.tempo,
  //     mm: data.mm,
  //   });
  //
  //   this.state.instruments.forEach(inst => {
  //     inst.setMm(data.mm);
  //     if (data.instruments[inst.constructor.name]) {
  //       inst.importJSON(data.instruments[inst.constructor.name]);
  //     }
  //   });
  // }
  
  importData(data) {
    this.setState({
      tempo: data.tempo,
      mm: data.mm,
    });
    
    this.state.instruments.forEach(inst => {
      inst.setMm(data.mm);
      if (data.instruments[inst.constructor.name]) {
        inst.importJSON(data.instruments[inst.constructor.name]);
      }
    });
  }
  
  render () {
    const startButton = this.state.timeout ? "pause" : "play";
    const tempo = Math.round(30000 / (this.state.tempo + 12));
    return (
      <div className="soundboard">
        <div className="soundboard-controls">
          <button className="control square button" onClick={this.toggleRunning}>
            <i className={`fa fa-${startButton}`} aria-hidden="true"></i>
          </button>
          <button className="control square button" onClick={this.handleStop}>
            <i className={`fa fa-stop`} aria-hidden="true"></i>
          </button>
          <button className="control square button" onClick={this.handleUndo}>
            <i className={`fa fa-undo`} aria-hidden="true"></i>
          </button>
          <button className="control square button" onClick={this.handleResetAll}>
            <i className={`fa fa-trash`} aria-hidden="true"></i>
          </button>
          <input className="control square input"
            onChange={this.handleMmChange}
            value={this.state.mm}
            />
          <div className="control tempo-container">
            <div className="tempo-title">Tempo: {tempo}</div>
            <input className="tempo-slider" type="range"
              min="60" max="360" step="1"
              value={this.state.tempo}
              onChange={this.handleTempoChange}/>
          </div>
          <button className="control square button" onClick={this.handleExport}>
            <i className={`fa fa-upload`} aria-hidden="true"></i>
          </button>
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
