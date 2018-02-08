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
    // this.addNote("3e", 0);
    this.addNote("2e", 4);
    this.addNote("2b", 4);
    this.addNote("3b", 6);
    this.addNote("2e", 12);
    this.addNote("2b", 12);
    this.addNote("3a", 14);
    
    this.addNote("3g", 16);
    this.addNote("3a", 18);
    this.addNote("2e", 20);
    this.addNote("2b", 20);
    this.addNote("3b", 22);
    this.addNote("3g", 26);
    this.addNote("3a", 28);
    this.addNote("2e", 28);
    this.addNote("2b", 28);
    this.addNote("3d", 30);
    
    this.addNote("2d", 36);
    this.addNote("2b", 36);
    this.addNote("3b", 38);
    this.addNote("2d", 44);
    this.addNote("2b", 44);
    this.addNote("3a", 46);
    
    this.addNote("3g", 48);
    this.addNote("3a", 50);
    this.addNote("2d", 52);
    this.addNote("2b", 52);
    this.addNote("2fs", 54);
    this.addNote("3g", 58);
    this.addNote("3a", 60);
    this.addNote("2d", 60);
    this.addNote("2b", 60);
    this.addNote("3d", 62);
    
    this.addNote("2fs", 68);
    this.addNote("2d", 68);
    this.addNote("2b", 68);
    this.addNote("3b", 70);
    this.addNote("2fs", 76);
    this.addNote("2d", 76);
    this.addNote("2b", 76);
    this.addNote("3d", 78);
    
    this.addNote("3c", 80);
    this.addNote("3b", 82);
    this.addNote("2fs", 84);
    this.addNote("2d", 84);
    this.addNote("2b", 84);
    this.addNote("3a", 86);
    this.addNote("3g", 90);
    this.addNote("3a", 92);
    this.addNote("2d", 92);
    this.addNote("2b", 92);
    this.addNote("2e", 94);
    
    this.addNote("2c", 98);
    this.addNote("2e", 100);
    this.addNote("3b", 102);
    this.addNote("2b", 104);
    this.addNote("2c", 106);
    this.addNote("2d", 108);
    this.addNote("3d", 110);
    
    this.addNote("3c", 112);
    this.addNote("3b", 114);
    this.addNote("2d", 116);
    this.addNote("3a", 118);
    this.addNote("3g", 122);
    this.addNote("3a", 124);
    this.addNote("3e", 126);
  }
}

export default Vibraphone;
