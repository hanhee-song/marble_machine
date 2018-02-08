import Instrument from './instrument';

class Vibraphone extends Instrument {
  constructor(props) {
    super(props);
    // this.notes
    this.setup();
    this.initializeMarble();
    this._preloadAudio();
  }
  
  setup() {
    this.notes = [
      "0e", "0fs",
      "1g", "1a", "1b", "1c", "1d", "1e", "1fs",
      "2g", "2a", "2b", "2c", "2d", "2e", "2fs",
      "3g", "3a", "3b", "3c", "3d", "3e", "3fs",
      "4g"
    ].reverse();
    this.notes.forEach((note) => {
      this.sounds[note] = new Audio(`audio/vib_${note}.wav`);
      this.sounds[note].url = `public/audio/vib_${note}.wav`;
      this.sounds[note].volume = 0.16;
    });
  }
  
  initializeMarble() {
    // this.addNote("3e", 0 / 2);
    this.addNote("2e", 4 / 2);
    this.addNote("2b", 4 / 2);
    this.addNote("3b", 6 / 2);
    this.addNote("2e", 12 / 2);
    this.addNote("2b", 12 / 2);
    this.addNote("3a", 14 / 2);
    
    this.addNote("3g", 16 / 2);
    this.addNote("3a", 18 / 2);
    this.addNote("2e", 20 / 2);
    this.addNote("2b", 20 / 2);
    this.addNote("3b", 22 / 2);
    this.addNote("3g", 26 / 2);
    this.addNote("3a", 28 / 2);
    this.addNote("2e", 28 / 2);
    this.addNote("2b", 28 / 2);
    this.addNote("3d", 30 / 2);
    
    this.addNote("2d", 36 / 2);
    this.addNote("2b", 36 / 2);
    this.addNote("3b", 38 / 2);
    this.addNote("2d", 44 / 2);
    this.addNote("2b", 44 / 2);
    this.addNote("3a", 46 / 2);
    
    this.addNote("3g", 48 / 2);
    this.addNote("3a", 50 / 2);
    this.addNote("2d", 52 / 2);
    this.addNote("2b", 52 / 2);
    this.addNote("2fs", 54 / 2);
    this.addNote("3g", 58 / 2);
    this.addNote("3a", 60 / 2);
    this.addNote("2d", 60 / 2);
    this.addNote("2b", 60 / 2);
    this.addNote("3d", 62 / 2);
    
    this.addNote("2fs", 68 / 2);
    this.addNote("2d", 68 / 2);
    this.addNote("2b", 68 / 2);
    this.addNote("3b", 70 / 2);
    this.addNote("2fs", 76 / 2);
    this.addNote("2d", 76 / 2);
    this.addNote("2b", 76 / 2);
    this.addNote("3d", 78 / 2);
    
    this.addNote("3c", 80 / 2);
    this.addNote("3b", 82 / 2);
    this.addNote("2fs", 84 / 2);
    this.addNote("2d", 84 / 2);
    this.addNote("2b", 84 / 2);
    this.addNote("3a", 86 / 2);
    this.addNote("3g", 90 / 2);
    this.addNote("3a", 92 / 2);
    this.addNote("2d", 92 / 2);
    this.addNote("2b", 92 / 2);
    this.addNote("2e", 94 / 2);
    
    this.addNote("2c", 98 / 2);
    this.addNote("2e", 100 / 2);
    this.addNote("3b", 102 / 2);
    this.addNote("2b", 104 / 2);
    this.addNote("2c", 106 / 2);
    this.addNote("2d", 108 / 2);
    this.addNote("3d", 110 / 2);
    
    this.addNote("3c", 112 / 2);
    this.addNote("3b", 114 / 2);
    this.addNote("2d", 116 / 2);
    this.addNote("3a", 118 / 2);
    this.addNote("3g", 122 / 2);
    this.addNote("3a", 124 / 2);
    this.addNote("3e", 126 / 2);
  }
}

export default Vibraphone;
