import Instrument from './instrument';

class Drums extends Instrument {
  constructor(props) {
    super(props);
    // this.notes;
    this._setup();
    this.name = "Drums";
    this._preloadAudio();
  }
  
  _setup() {
    this.notes = ["kick", "snare", "hat"];//, "crash"];
    this.notes.forEach((note) => {
      this.sounds[note] = new Audio(`audio/drums_${note}.wav`);
      this.sounds[note].url = `public/audio/drums_${note}.wav`;
    });
    this.sounds["snare"].volume = 0.27;
    this.sounds["hat"].volume = 0.12;
    // this.sounds["crash"].volume= 0.2;
  }
}

export default Drums;
