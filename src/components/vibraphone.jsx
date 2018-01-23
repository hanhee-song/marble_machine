import React from 'react';
import Vibraphone from '../classes/vibraphone.js';

class VibraphoneBoard extends React.Component {
  constructor(props) {
    super(props);
    this.vibraphone = new Vibraphone();
    this.state = {
    };
  }
  
  componentDidMount() {
    this.vibraphone.addNote("e3", 0);
    this.vibraphone.addNote("e2", 4);
    this.vibraphone.addNote("b2", 4);
    this.vibraphone.addNote("b3", 6);
    this.vibraphone.addNote("e2", 12);
    this.vibraphone.addNote("a3", 14);
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.currentBeat !== nextProps.currentBeat) {
      console.log(this.props.currentBeat);
      this.vibraphone.play(this.props.currentBeat);
    }
  }
  
  render () {
    return (
      <div>Vibraphone</div>
    );
  }
}

export default VibraphoneBoard;
