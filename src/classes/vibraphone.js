import Instrument from './instrument';

class Vibraphone extends Instrument {
  constructor(props) {
    super(props);
    // this.notes
    this._setup();
    this.name = "Vibraphone";
    this._preloadAudio();
  }
  
  _setup() {
    this.notes = [
      "0e", "0fs",
      "1g", "1a", "1b", "1c", "1d", "1e", "1fs",
      "2g", "2a", "2b", "2c", "2d", "2e", "2fs",
      "3g", "3a", "3b", "3c", "3d", "3e", "3fs",
      "4g", "4a", "4b", "4c"
    ].reverse();
    this.notes.forEach((note) => {
      this.sounds[note] = new Audio(`audio/vib_${note}.wav`);
      this.sounds[note].url = `public/audio/vib_${note}.wav`;
      this.sounds[note].volume = 0.16;
    });
  }
}

export default Vibraphone;
