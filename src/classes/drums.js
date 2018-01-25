import Instrument from './instrument';

class Drums extends Instrument {
  constructor(props) {
    super(props);
    this.setup();
    this.initializeMarble();
    this._preloadAudio();
  }
  
  setup() {
    const notes = ["kick", "snare", "hat", "crash"];
    notes.forEach((note) => {
      this.sounds[note] = new Audio(`audio/drums_${note}.wav`);
      this.sounds[note].url = `public/audio/drums_${note}.wav`;
    });
    this.sounds["snare"].volume = 0.27;
    this.sounds["hat"].volume = 0.12;
    this.sounds["crash"].volume= 0.2;
  }
  
  initializeMarble() {
    for (let i = 0; i < 12; i++) {
      this.addNote("snare", 8 * i + 4);
    }
    this.addNote("snare", 104);
    this.addNote("snare", 110);
    this.addNote("snare", 114);
    this.addNote("snare", 120);
    this.addNote("snare", 126);
    
    this.addNote("kick", 0);
    this.addNote("kick", 8);
    this.addNote("kick", 16);
    this.addNote("kick", 22);
    this.addNote("kick", 26);
    
    this.addNote("kick", 32);
    this.addNote("kick", 40);
    this.addNote("kick", 48);
    this.addNote("kick", 58);
    this.addNote("kick", 62);
    
    this.addNote("kick", 64);
    this.addNote("kick", 72);
    this.addNote("kick", 80);
    this.addNote("kick", 82);
    this.addNote("kick", 86);
    this.addNote("kick", 90);
    
    this.addNote("kick", 96);
    this.addNote("kick", 100);
    this.addNote("kick", 110);
    this.addNote("kick", 116);
    this.addNote("kick", 122);
    // this.addNote("kick", 126);
    
    this.addNote("hat", 2);
    this.addNote("hat", 8);
    this.addNote("hat", 16);
    this.addNote("hat", 24);
    this.addNote("hat", 28);
    
    this.addNote("hat", 32 + 2);
    this.addNote("hat", 32 + 8);
    this.addNote("hat", 32 + 16);
    this.addNote("hat", 32 + 24);
    this.addNote("hat", 32 + 30);
    
    this.addNote("hat", 66);
    this.addNote("hat", 72);
    this.addNote("hat", 82);
    this.addNote("hat", 86);
    this.addNote("hat", 90);
    this.addNote("hat", 94);
    
    this.addNote("hat", 100);
    this.addNote("hat", 108);
    this.addNote("hat", 120);
    this.addNote("hat", 124);
    
    // this.addNote("crash", 0);
  }
}

export default Drums;
