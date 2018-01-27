import React, { Component } from 'react';
import Soundboard from './components/soundboard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="title">Marble Machine</div>
        
        <Soundboard />
          
        <div class="name">
          Hanhee Song
        </div>
        <div class="about-me">
          <a href="https://hanhee-song.com" target="_blank"><i class="fa fa-home" aria-hidden="true"></i></a>
          <a href="https://github.com/hanhee-song/project-visualizer" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a>
          <a href="https://www.linkedin.com/in/hanhee-song" target="_blank"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
          <a href="mailto:song.hanhee@gmail.com"><i class="fa fa-envelope" aria-hidden="true"></i>&nbsp;<div class="text">song.hanhee@gmail.com</div> </a>
        </div>
      </div>
    );
  }
}

export default App;
