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
    const interval = setInterval(() => {
      this.setState({ currentBeat: this.state.currentBeat + 1 });
      console.log(this.state.currentBeat);
    }, this.state.tempo);
    this.setState({ interval });
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
