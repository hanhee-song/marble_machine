import Instrument from './instrument';

class Drums extends Instrument {
  constructor(props) {
    super(props);
    this.setup();
    this.initializeMarble();
  }
  
  setup() {
    const notes = ["kick", "snare", "bass", "crash"];
    notes.forEach((note) => {
      this.sounds[note] = new Audio(`audio/drums_${note}.wav`);
      this.sounds[note].url = `public/audio/drums_${note}.wav`;
    });
  }
  
  initializeMarble() {
    
  }
}

export default Drums;
