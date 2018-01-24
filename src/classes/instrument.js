class Instrument {
  constructor(mm) {
    this.beat = new Array(mm);
    this.mm = mm;
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
  
  getNotes(beat) {
    return this.beat[beat]; // returns a Set
  }
  
  getLine(note) {
    return this.beat
      .filter((_, i) => i % 2 === 0)
      .map(set => set.has(note));
  }
}

export default Instrument;
