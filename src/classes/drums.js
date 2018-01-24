import Instrument from './instrument';

class Drums extends Instrument {
  constructor(props) {
    super(props);
  }
  
  setup() {
    const notes = ["kick", "snare", "bass"];
  }
}

export default Drums;
