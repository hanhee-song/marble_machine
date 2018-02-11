import { deepCopy } from '../util/deep_copy';

class Instrument {
  constructor(mm) {
    this.beatsArray = new Array(mm);
    this.mm = mm;
    this.muted = new Set();
    for (var i = 0; i < this.beatsArray.length; i++) {
      this.beatsArray[i] = [];
    }
    this.notes = [];
    this.sounds = {};
    this.history = [];
    this.updateComponentCallbacks = {};
    // this.name;
  }
  
  _preloadAudio() {
    Object.keys(this.sounds).forEach((note) => {
      setTimeout(() => {
        this.sounds[note].preload = "auto";
        const vol = this.sounds[note].volume;
        this.sounds[note].volume = 0.00;
        this.sounds[note].play();
        setTimeout(() => {
          // this.sounds[note].pause();
          this.sounds[note].volume = vol;
        }, 2000);
      }, Math.random() * 2000);
    });
  }
  
  // DISPLAY FOR REACT COMPONENT =============================
  
  allNotes() {
    return this.notes;
  }
  
  getNotes(beat) {
    return this.beatsArray[beat];
  }
  
  getLine(note) {
    if (this.beatsArray.length > this.mm) {
      return this.beatsArray.slice(0, this.mm).map(arr => arr.includes(note));
    } else {
      return this.beatsArray.map(arr => arr.includes(note));
    }
  }
  
  setUpdateComponentCallback(callback, note) {
    this.updateComponentCallbacks[note] = callback;
  }
  
  updateComponents(note) {
    if (note) {
      this.updateComponentCallbacks[note]();
    } else {
      Object.values(this.updateComponentCallbacks).forEach(callback => {
        callback();
      });
    }
  }
  
  // PLAY, ADD, REMOVE, CLEAR ================================
  
  playNote(note) {
    if (!this.sounds[note].paused) {
      this.sounds[note].pause();
    }
    this.sounds[note].currentTime = 0;
    this.sounds[note].play();
  }
  
  playAtBeat(n) {
    if (n === undefined) return;
    this.beatsArray[n].forEach((note) => {
        if (!this.isMuted(note)) {
        if (!this.sounds[note].paused) {
          this.sounds[note].pause();
        }
        this.sounds[note].currentTime = 0;
        this.sounds[note].play();
      }
    });
  }
  
  addNote(note, beat) {
    if (!this.beatsArray[beat].includes(note)) {
      this.historyPush();
      this.beatsArray[beat].push(note);
    }
  }
  
  removeNote(note, beat) {
    if (this.beatsArray[beat].includes(note)) {
      this.historyPush();
      this.beatsArray[beat] = this.beatsArray[beat].filter(n => n !== note);
    }
  }
  
  clearAllNotes() {
    this.historyPush();
    this.beatsArray = new Array(this.mm);
    for (var i = 0; i < this.beatsArray.length; i++) {
      this.beatsArray[i] = [];
    }
  }
  
  // HISTORY ===========================================
  
  historyPush() {
    const newEntry = {
      time: new Date().getTime(),
      state: deepCopy(this.beatsArray),
    };
    this.history.push(newEntry);
    if (this.history.length > 40) {
      this.history = this.history.slice(1);
    }
  }
  
  getMostRecentHistory() {
    if (this.history.length > 0) {
      return this.history[this.history.length - 1].time;
    } else {
      return -1;
    }
  }
  
  historyPop() {
    if (this.history.length >= 1) {
      const state = this.history.pop().state;
      this.beatsArray = state;
      this.updateComponents();
    }
  }
  
  // MUTE FUNCTIONS ====================================
  
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
  
  // MISC ===================================================
  
  setMm(mm) {
    this.mm = mm;
    const currentMm = this.beatsArray.length;
    if (mm > currentMm) {
      for (var i = 0; i < mm - currentMm; i++) {
        this.beatsArray.push([]);
      }
    }
  }
  
  // EXPORT ==================================================
  
  exportJSON() {
    // Save muted as an array
    const data = {
      muted: Array.from(this.muted),
      beatsArray: this.beatsArray.slice(0, this.mm),
    };
    return JSON.stringify(data);
  }
  
  importJSON(json) {
    let data;
    if (typeof json === "string") {
      data = JSON.parse(json);
    } else {
      data = json;
    }
    this.beatsArray = data.beatsArray;
  // convert muted back into a set
    this.muted = new Set(data.muted);
    this.updateComponents();
  }
  
  // importJSON(json) {
  //   if (!json) {
  //     console.log("Invalid Input");
  //   }
  //   if (typeof json === "string") {
  //     this.beatsArray = JSON.parse(json);
  //   } else {
  //     this.beatsArray = json;
  //   }
  //   this.updateComponents();
  // }
  
  getName() {
    return this.name;
  }
}

export default Instrument;
