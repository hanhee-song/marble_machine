import Instrument from './instrument';

class Drums extends Instrument {
  constructor(props) {
    super(props);
    this.setup();
    this.initializeMarble();
  }
  
  setup() {
    const notes = ["kick", "snare", "hat", "crash"];
    notes.forEach((note) => {
      this.sounds[note] = new Audio(`audio/drums_${note}.wav`);
      this.sounds[note].url = `public/audio/drums_${note}.wav`;
    });
  }
  
  initializeMarble() {
    for (let i = 0; i < 16; i++) {
      this.addNote("snare", 8 * i + 4);
    }
    for (let i = 0; i < 16; i++) {
      this.addNote("kick", 8 * i);
    }
  }
}

export default Drums;
