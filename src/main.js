const instruments = require("./instrument.js");
const Vibraphone = instruments.Vibraphone;

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
