import React, { Component } from 'react';
import Soundboard from './components/soundboard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="title">Marble Machine</div>
        
        <Soundboard />
          
        <div className="footer">
          Hanhee Song
          <div className="about-me">
            <a href="https://hanhee-song.com" rel="noopener noreferrer" target="_blank"><i className="fa fa-home" aria-hidden="true"></i>&nbsp;Portfolio</a>
            <a href="https://github.com/hanhee-song/marble_machine" rel="noopener noreferrer" target="_blank"><i className="fa fa-github" aria-hidden="true"></i>&nbsp;Github</a>
            <a href="https://www.linkedin.com/in/hanhee-song" rel="noopener noreferrer" target="_blank"><i className="fa fa-linkedin" aria-hidden="true"></i>&nbsp;LinkedIn</a>
            <a href="mailto:song.hanhee@gmail.com"><i className="fa fa-envelope" aria-hidden="true"></i>&nbsp;<div className="text">song.hanhee@gmail.com</div> </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
