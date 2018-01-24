import Instrument from './instrument';

class Vibraphone extends Instrument {
  constructor(props) {
    super(props);
    this.setup();
    this.initializeMarble();
  }
  
  setup() {
    const notes = ["b2", "c2", "d2", "e2",
    "fs2", "g3", "a3", "b3", "c3", "d3", "e3"];
    notes.forEach((note) => {
      this.sounds[note] = new Audio(`audio/vib_${note}.wav`);
      this.sounds[note].url = `public/audio/vib_${note}.wav`;
    });
  }
  
  initializeMarble() {
    this.addNote("e3", 0);
    this.addNote("e2", 4);
    this.addNote("b2", 4);
    this.addNote("b3", 6);
    this.addNote("e2", 12);
    this.addNote("a3", 14);
  }
}

export default Vibraphone;
