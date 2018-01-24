import React from 'react';

class Line extends React.Component {
  constructor(props) {
    super(props);
    // this.props.instrument;
    // this.props.mm;
    // this.props.note;
    // this.props.currentBeat;
    this.renderSquares = this.renderSquares.bind(this);
    this.state = {
      line: this.props.instrument.getLine(this.props.note),
    };
    this.updateNotes = this.updateNotes.bind(this);
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    // It should update only when
    // 1. props' currentBeat is even
    // 2. && there is a truthy value at this.state.line at prop's current beat
    // 3. Even if the above two don't hold, we should update
      // if the previous beat's was truthy
      
    return (
      (
        nextProps.currentBeat % 2 === 0
        && this.state.line[Math.floor(nextProps.currentBeat / 2)]
      ) ||
      (
        this.props.currentBeat % 2 === 1
        && this.state.line[Math.floor(this.props.currentBeat / 2)]
      )
    );
  }
  
  componentDidMount() {
    this.updateNotes();
  }
  
  updateNotes() {
    this.setState({ line: this.props.instrument.getLine(this.props.note) });
  }
  
  renderSquares() {
    return this.state.line.map((bool, i) => {
      const current = Math.floor(this.props.currentBeat / 2) === i ? "current" : "";
      const active = bool ? "active" : "";
      return (
        <div className={`line-square wide ${current} ${active}`}
          key={i}>
        </div>
      );
    });
  }
  
  render () {
    return (
      <div className="line">
        <div className="line-note-title">{this.props.note}</div>
        {this.renderSquares()}
      </div>
    );
  }
}

export default Line;
