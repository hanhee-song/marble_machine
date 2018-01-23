import React from 'react';
import Vibraphone from '../classes/instrument.js';

class VibraphoneBoard extends React.Component {
  constructor(props) {
    super(props);
    this.vibraphone = new Vibraphone();
    this.state = {
      
    };
  }
  
  render () {
    return (
      <div>Vibraphone</div>
    );
  }
}

export default VibraphoneBoard;
