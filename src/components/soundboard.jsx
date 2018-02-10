import React from 'react';
import Drums from '../classes/drums';
import Vibraphone from '../classes/vibraphone';
import InstrumentBoard from './instrument_board';
import Slider from './slider';
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
    this.changeCurrentBeat = this.changeCurrentBeat.bind(this);
  }
  
  componentDidMount() {
    const defaultString = "eyJ0ZW1wbyI6MjA0LCJtbSI6NjQsImluc3RydW1lbnRzIjp7IlZpYnJhcGhvbmUiOiJbW1wiMGVcIl0sW10sW1wiMmVcIixcIjJixQfHGlwiM2LHCTHIEskbyzLGK2HFEMkpM2fOGdo5z3TKfWfGUs9Jy0DEHmHIHmTGEGTqANXJOjLGHMgzyVHpAN7IEtQyzHzHXvIA3tk5MmZzziEwxBH9AODKQvoA4FwiMcZizWXPO+wBYsYoyAnJG9M6zW7JEGPPIM9j2UjnAR/xAILoAP3PKctA7ADt5wH06QJdMWPIGckJ8QKzyETSK8hW5ADl7ADeyW/KRMkS6AGH9gICxgnkAINdIiwiRHJ1bXPnA2VraWNrxyBoYXTHCnNuYXLrA33GJCzKIt8l1SXXa8sVxyzQQ9U3333/AKLbJfwAmtZG/wCi333TJdhn/QCG3zX4ANzbTfkBGccZLNBH9QHs9wHa/wE1XSJ9fQ==";
    let compressedString = this.props.location.pathname.slice(1);
    try {
      if (!compressedString) {
        compressedString = defaultString;
        this.props.history.push("/" + defaultString);
      }
      this.importData(JSON.parse(decompress(decodeBase64(compressedString))));
    }
    catch(err) {
      this.props.history.push("/");
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== "/" && this.props.location.pathname !== nextProps.location.pathname) {
      let compressedString = nextProps.location.pathname.slice(1);
      try {
        this.importData(JSON.parse(decompress(decodeBase64(compressedString))));
      }
      catch(err) {
        this.props.history.goBack();
        console.log("Invalid URL");
      }
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
    this.handleStop();
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
  
  changeCurrentBeat(num) {
    this.setState({ currentBeat: num });
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
    
    // Get the most recent timestamp
    const keys = Object.keys(instrumentUndos).map(time => Number(time));
    const max = Math.max.apply(null, keys);
    // instrumentsToReverse = instrumentsToReverse.concat(instrumentUndos[max]);
    
    // Iterate over all keys, put anything within 10 miliseconds in the arr
    keys.forEach(timestamp => {
      if (max - timestamp < 10) {
        let instruments = instrumentUndos[timestamp];
        instrumentsToReverse = instrumentsToReverse.concat(instruments);
      }
    });
    
    instrumentsToReverse = [...new Set(instrumentsToReverse)];
    
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
      // Don't use inst.constructor.name
      // React will rename the classes to "t"
      const name = inst.getName();
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
  //     if (data.instruments[inst.getName()]) {
  //       inst.importJSON(data.instruments[inst.getName()]);
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
      if (data.instruments[inst.getName()]) {
        inst.importJSON(data.instruments[inst.getName()]);
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
          <Slider
            changeCurrentBeat={this.changeCurrentBeat}
            currentBeat={this.state.currentBeat}
            mm={this.state.mm} />
          <InstrumentBoard
            playing={Boolean(this.state.timeout)}
            currentBeat={this.state.currentBeat}
            mm={this.state.mm}
            instrument={this.state.instruments[0]} />
          <InstrumentBoard
            playing={Boolean(this.state.timeout)}
            currentBeat={this.state.currentBeat}
            mm={this.state.mm}
            instrument={this.state.instruments[1]} />
        </div>
      </div>
    );
  }
}

export default Soundboard;
