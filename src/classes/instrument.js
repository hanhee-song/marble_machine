class Instrument {
  constructor(mm) {
    this.beat = new Array(mm);
    this.mm = mm;
    this.muted = new Set();
    for (var i = 0; i < this.beat.length; i++) {
      this.beat[i] = new Set();
    }
    this.notes = [];
    this.sounds = {};
  }
  
  _preloadAudio() {
    Object.keys(this.sounds).forEach((note) => {
      setTimeout(() => {
        this.sounds[note].preload = "auto";
        const vol = this.sounds[note].volume;
        this.sounds[note].volume = 0.00;
        this.sounds[note].play();
        setTimeout(() => {
          this.sounds[note].pause();
          this.sounds[note].volume = vol;
        }, 1000);
      }, Math.random() * 2000);
    });
  }
  
  allNotes() {
    return this.notes;
  }
  
  play(n) {
    this.beat[n].forEach((note) => {
      if (!this.isMuted(note)) {
        this.sounds[note].pause();
        this.sounds[note].currentTime = 0;
        this.sounds[note].play();
      }
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
  
  mute(note) {
    if (note) {
      this.muted.add(note);
    } else {
      Object.keys(this.sounds).forEach((n) => {
        this.muted.add(n);
      });
    }
  }
  
  unmute(note) {
    if (note) {
      this.muted.delete(note);
    } else {
      this.muted.clear();
    }
  }
  
  isMuted(note) {
    if (note) {
      return this.muted.has(note);
    } else {
      return this.muted.size === this.sounds.size;
    }
  }
}

export default Instrument;
