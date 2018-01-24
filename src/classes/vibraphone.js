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
    // this.addNote("e3", 0);
    this.addNote("e2", 4);
    this.addNote("b2", 4);
    this.addNote("b3", 6);
    this.addNote("e2", 12);
    this.addNote("b2", 12);
    this.addNote("a3", 14);
    
    this.addNote("g3", 16);
    this.addNote("a3", 18);
    this.addNote("e2", 20);
    this.addNote("b2", 20);
    this.addNote("b3", 22);
    this.addNote("g3", 26);
    this.addNote("a3", 28);
    this.addNote("b2", 28);
    this.addNote("d3", 30);
    
    this.addNote("d2", 36);
    this.addNote("b2", 36);
    this.addNote("b3", 38);
    this.addNote("d2", 44);
    this.addNote("b2", 44);
    this.addNote("a3", 46);
    
    this.addNote("g3", 48);
    this.addNote("a3", 50);
    this.addNote("d2", 52);
    this.addNote("b2", 52);
    this.addNote("fs2", 54);
    this.addNote("g3", 58);
    this.addNote("a3", 60);
    this.addNote("b2", 60);
    this.addNote("d3", 62);
    
    this.addNote("fs2", 68);
    this.addNote("b2", 68);
    this.addNote("b3", 70);
    this.addNote("fs2", 76);
    this.addNote("b2", 76);
    this.addNote("d3", 78);
    
    this.addNote("c3", 80);
    this.addNote("b3", 82);
    this.addNote("fs2", 84);
    this.addNote("b2", 84);
    this.addNote("a3", 86);
    this.addNote("g3", 90);
    this.addNote("a3", 92);
    this.addNote("fs2", 92);
    this.addNote("b2", 92);
    this.addNote("e2", 94);
    
    this.addNote("c2", 98);
    this.addNote("e2", 100);
    this.addNote("b3", 102);
    this.addNote("b2", 104);
    this.addNote("c2", 106);
    this.addNote("d2", 108);
    this.addNote("d3", 110);
    
    this.addNote("c3", 112);
    this.addNote("b3", 114);
    this.addNote("d2", 116);
    this.addNote("a3", 118);
    this.addNote("g3", 122);
    this.addNote("a3", 124);
    this.addNote("e3", 126);
  }
}

export default Vibraphone;
