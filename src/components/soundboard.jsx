import React from 'react';
import VibraphoneBoard from './vibraphone';

class Soundboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBeat: 0,
      interval: null,
      tempo: 110,
    };
  }
  
  componentDidMount() {
    setTimeout(() => {
      const interval = setInterval(() => {
        const nextBeat = this.state.currentBeat === 128 ? 0 : this.state.currentBeat + 1;
        this.setState({ currentBeat: nextBeat });
      }, this.state.tempo);
      this.setState({ interval });
      
    }, 1000);
  }
  
  render () {
    return (
      <div>
        <VibraphoneBoard currentBeat={this.state.currentBeat} />
      </div>
    );
  }
}

export default Soundboard;
