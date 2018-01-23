document.addEventListener("DOMContentLoaded", () => {
  let beat = 0;
  const vibraphone = new Vibraphone();
  
  setInterval(() => {
    vibraphone.play(beat);
    console.log(beat);
    beat++;
    if (beat >= 128) {
      beat = 0;
    }
  }, 110);
  
  vibraphone.addNote("e3", 0);
  vibraphone.addNote("e2", 4);
  vibraphone.addNote("b2", 4);
  vibraphone.addNote("b3", 6);
  vibraphone.addNote("e2", 12);
  vibraphone.addNote("a3", 14);
});

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

class Vibraphone extends Instrument {
  constructor() {
    super();
    this.sounds["b2"] = new Audio("audio/vib_b2.wav");
    this.sounds["c2"] = new Audio("audio/vib_c2.wav");
    this.sounds["d2"] = new Audio("audio/vib_d2.wav");
    this.sounds["e2"] = new Audio("audio/vib_e2.wav");
    this.sounds["fs2"] = new Audio("audio/vib_fs2.wav");
    this.sounds["g3"] = new Audio("audio/vib_g3.wav");
    this.sounds["a3"] = new Audio("audio/vib_a3.wav");
    this.sounds["b3"] = new Audio("audio/vib_b3.wav");
    this.sounds["c3"] = new Audio("audio/vib_c3.wav");
    this.sounds["d3"] = new Audio("audio/vib_d3.wav");
    this.sounds["e3"] = new Audio("audio/vib_e3.wav");
  }
}
