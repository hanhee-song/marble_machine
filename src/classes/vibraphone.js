import Instrument from './instrument';

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

export default Vibraphone;
