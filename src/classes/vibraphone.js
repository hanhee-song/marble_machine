import Instrument from './instrument';

class Vibraphone extends Instrument {
  constructor(props) {
    super(props);
    this.setup();
  }
  
  setup() {
    const notes = ["b2", "c2", "d2", "e2",
    "fs2", "g3", "a3", "b3", "c3", "d3", "e3"];
    notes.forEach((note) => {
      this.sounds[note] = new Audio(`audio/vib_${note}.wav`);
      this.sounds[note].url = `public/audio/vib_${note}.wav`;
    });
  }
}

export default Vibraphone;
