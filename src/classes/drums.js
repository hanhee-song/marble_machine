import Instrument from './instrument';

class Drums extends Instrument {
  constructor(props) {
    super(props);
    // this.notes;
    this.setup();
    // this.initializeMarble();
    this._preloadAudio();
  }
  
  setup() {
    this.notes = ["kick", "snare", "hat", "crash"];
    this.notes.forEach((note) => {
      this.sounds[note] = new Audio(`audio/drums_${note}.wav`);
      this.sounds[note].url = `public/audio/drums_${note}.wav`;
    });
    this.sounds["snare"].volume = 0.27;
    this.sounds["hat"].volume = 0.12;
    this.sounds["crash"].volume= 0.2;
  }
  
  initializeMarble() {
    for (let i = 0; i < 12; i++) {
      this.addNote("snare", (8 * i + 4) / 2);
    }
    this.addNote("snare", 104 / 2);
    this.addNote("snare", 110 / 2);
    this.addNote("snare", 114 / 2);
    this.addNote("snare", 120 / 2);
    this.addNote("snare", 126 / 2);
    
    this.addNote("kick", 0 / 2);
    this.addNote("kick", 8 / 2);
    this.addNote("kick", 16 / 2);
    this.addNote("kick", 22 / 2);
    this.addNote("kick", 26 / 2);
    
    this.addNote("kick", 32 / 2);
    this.addNote("kick", 40 / 2);
    this.addNote("kick", 48 / 2);
    this.addNote("kick", 58 / 2);
    this.addNote("kick", 62 / 2);
    
    this.addNote("kick", 64 / 2);
    this.addNote("kick", 72 / 2);
    this.addNote("kick", 80 / 2);
    this.addNote("kick", 82 / 2);
    this.addNote("kick", 86 / 2);
    this.addNote("kick", 90 / 2);
    
    this.addNote("kick", 96 / 2);
    this.addNote("kick", 100 / 2);
    this.addNote("kick", 110 / 2);
    this.addNote("kick", 116 / 2);
    this.addNote("kick", 122 / 2);
    // this.addNote("kick", 126 / 2);
    
    this.addNote("hat", 2 / 2);
    this.addNote("hat", 8 / 2);
    this.addNote("hat", 16 / 2);
    this.addNote("hat", 24 / 2);
    this.addNote("hat", 28 / 2);
    
    this.addNote("hat", (32 + 2) / 2);
    this.addNote("hat", (32 + 8) / 2);
    this.addNote("hat", (32 + 16) / 2);
    this.addNote("hat", (32 + 24) / 2);
    this.addNote("hat", (32 + 30) / 2);
    
    this.addNote("hat", 66 / 2);
    this.addNote("hat", 72 / 2);
    this.addNote("hat", 82 / 2);
    this.addNote("hat", 86 / 2);
    this.addNote("hat", 90 / 2);
    this.addNote("hat", 94 / 2);
    
    this.addNote("hat", 100 / 2);
    this.addNote("hat", 108 / 2);
    this.addNote("hat", 120 / 2);
    this.addNote("hat", 124 / 2);
    
    // this.addNote("crash", 0 / 2);
  }
}

export default Drums;
