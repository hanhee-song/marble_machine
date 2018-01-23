class Instrument {
  constructor() {
    this.beat = new Array(128);
    for (var i = 0; i < this.beat.length; i++) {
      this.beat[i] = new Set();
    }
    this.sounds = {};
  }
  
  play(n) {
    this.beat[n].forEach((note) => {
      this.sounds[note].pause();
      this.sounds[note].currentTime = 0;
      this.sounds[note].play();
    });
  }
  
  addNote(note, beat) {
    this.beat[beat].add(note);
  }
  
  removeNote(note, beat) {
    this.beat[beat].delete(note);
  }
}

export default Instrument;
