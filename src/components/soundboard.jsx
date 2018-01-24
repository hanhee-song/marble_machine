import React from 'react';
import VibraphoneBoard from './vibraphone';

class Soundboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBeat: 0,
      interval: null,
      tempo: 105,
      mm: 128,
    };
  }
  
  componentDidMount() {
    setTimeout(() => {
      const interval = setInterval(() => {
        const nextBeat = this.state.currentBeat + 1 === this.state.mm
            ? 0 : this.state.currentBeat + 1;
        this.setState({ currentBeat: nextBeat });
      }, this.state.tempo);
      this.setState({ interval });
    }, 1000);
  }
  
  render () {
    return (
      <div className="soundboard">
        <VibraphoneBoard currentBeat={this.state.currentBeat} mm={this.state.mm} />
      </div>
    );
  }
}

export default Soundboard;
