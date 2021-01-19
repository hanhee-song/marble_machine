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
      popup: "",
      popupTimeout: null,
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
    this.handlePreload = this.handlePreload.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleExport = this.handleExport.bind(this);
    this.compressState = this.compressState.bind(this);
    // this.handleImport = this.handleImport.bind(this);
    this.importData = this.importData.bind(this);
    this.changeCurrentBeat = this.changeCurrentBeat.bind(this);
    this.setPopup = this.setPopup.bind(this);
  }
  
  componentDidMount() {
    const isChrome = !!window.chrome;
    if (!isChrome) {
      this.setPopup("Please use Google Chrome for the best experience.");
    } else {
      const defaultString = "eyJ0ZW1wbyI6MjA0LCJtbSI6NjQsImluc3RydW1lbnRzIjp7IlZpYnJhcGhvbmUiOiJ7XCJtdXRlZFwiOltdLFwiYmVhdHNBcnJhecQSW1wiMGVcIixcIjFlXCJdLFtdLFtcIjLGEzJixQfEIcUXM2LHCccsyxvLMsYrYcxVXCIzZ84Z2jnPdMp9Z8ZSz0nLQMQeYcgeZMYQZOoA1ck6MsYcyDPJUekA3sgS1DLMfMde8gDe2TkyZnPOITDEEf0A4MpC+gDgXCIxxmLNZcc7xxvrAOHpAI/JG8wzzWDJPGP1AafbQecBCtF06ADo7wFM6ACtyEDnAdjpAkExY8gZyQnxApfoASXSK8hW5ADX7ADQyW/KRMkS6AFr9gHmxgnkAINdfSIsIkRydW1z/wNu5QNua2lja8c+aGF0xwpzbmFy6wN/xiQsyiLfJdUl12vLFccs0EPVN999/wCi2yX8AJrWRv8Aot990yXYZ/0Aht81+ADc2035ARnHGSzQR/UB7PcB2v8BNV19In19";
      let compressedString = this.props.location.pathname.slice(1);
      if (this.isValidEncodedJSON(compressedString)) {
        this.importData(JSON.parse(decompress(decodeBase64(compressedString))));
        this.setPopup("Loaded from URL");
      } else {
        this.importData(JSON.parse(decompress(decodeBase64(defaultString))));
        this.props.history.push("/" + defaultString);
        this.setPopup("Loaded sample data");
      }
    }
    
  }
  
  componentWillReceiveProps(nextProps) {
    // Check not only that the URL changed but also check if the URL
      // changed but only by merit of data being exported
      // by comparing the current state with the url
    // Only necessary for manually pasting it in. Export will not trigger
      // new props if the URL and the current state are in sync
    let compressedString = nextProps.location.pathname.slice(1);
    if (this.props.location.pathname !== "/" && nextProps.location.pathname !== "/"
    && this.props.location.pathname !== nextProps.location.pathname
    && this.compressState() !== compressedString) {
      if (this.isValidEncodedJSON(compressedString)) {
        this.importData(JSON.parse(decompress(decodeBase64(compressedString))));
        this.setPopup("Loaded from URL");
      } else {
        this.setPopup("Invalid URL");
      }
    }
  }
  
  isValidEncodedJSON(string) {
    try {
      JSON.parse(decompress(decodeBase64(string)));
      return true;
    }
    catch(err) {
      return false;
    }
  }
  
  // CONTROLS =============================================
  
  handleResume() {
    const timeoutCallback = () => {
      const nextBeat = this.state.currentBeat + 1 >= this.state.mm
      ? 0 : this.state.currentBeat + 1;
      const timeout = setTimeout(timeoutCallback, this.state.tempo);
      this.setState({
        currentBeat: nextBeat,
        timeout
      });
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
    const numInput = parseInt(input);
    
    if (input === "") {
      this.setState({ mm: "" });
      this.state.instruments.forEach((instrument) => {
        instrument.setMm(0);
      });
    }
    
    if (input == numInput) {
      if (numInput > 128 || numInput < 1) {
        this.setPopup("Input must be between 1 and 128");
      } else {
        this.setState({ mm: numInput });
        this.state.instruments.forEach((instrument) => {
          instrument.setMm(numInput);
        });
      }
    }
  }
  
  changeCurrentBeat(num) {
    this.setState({ currentBeat: num });
  }
  
  handlePreload() {
    // Warning: highly experimental feature
    // This will make the instruments run the audio files a couple more
    // times to tell Chrome that it should really cache those things
    this.state.instruments.forEach(inst => {
      inst._preloadAudio();
      setTimeout(() => {
        inst._preloadAudio();
      }, 4000);
    });
    this.setPopup("Please wait 8 seconds for audio to cache");
    setTimeout(() => {
      this.setPopup("Done!");
    }, 9000);
  }
  
  // UNDO ====================================================
  
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
        instrument.updateComponents();
      });
    }
  }
  
  // IMPORT / EXPORT =======================================
  
  handleExport(e) {
    const url = "/" + this.compressState();
    if (this.props.location.pathname !== url) {
      this.props.history.push(url);
      this.setPopup("URL Updated!");
    } else {
      this.setPopup("No changes have been made");
    }
  }
  
  compressState() {
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
    return encodeBase64(compress(data));
  }
  
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
      inst.updateComponents();
    });
  }
  
  setPopup(text) {
    if (this.state.popup) {
      this.setState({ popup: "" });
    }
    // wrapped in timeout to ensure correct order of execution
    setTimeout(() => {
      if (this.state.popupTimeout) {
        clearTimeout(this.state.popupTimeout);
      }
      const timeout = setTimeout(() => {
        this.setState({
          popup: "",
          popupTimeout: null,
        });
      }, 2900);
      
      this.setState({
        popup: text,
        popupTimeout: timeout,
      });
    }, 0);
  }
  
  // ============================================================
  
  render () {
    const startButton = this.state.timeout ? "pause" : "play";
    const tempo = Math.round(30000 / (this.state.tempo + 12));
    return (
      <div className="soundboard">
        {
          this.state.popup &&
          <div className="popup">{this.state.popup}</div>
        }
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
          <button className="control square button" onClick={this.handlePreload}>
            <i className={`fa fa-refresh`} aria-hidden="true"></i>
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
