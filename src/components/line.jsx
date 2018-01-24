import React from 'react';

class Line extends React.Component {
  constructor(props) {
    super(props);
    // this.props.vibraphone;
    // this.props.mm;
    // this.props.note;
    // this.props.currentBeat;
    this.renderSquares = this.renderSquares.bind(this);
    this.state = {
      line: this.props.vibraphone.getLine(this.props.note),
    };
    this.updateNotes = this.updateNotes.bind(this);
  }
  
  componentDidMount() {
    this.updateNotes();
  }
  
  updateNotes() {
    this.setState({ line: this.props.vibraphone.getLine(this.props.note) });
  }
  
  renderSquares() {
    return this.state.line.map((bool, i) => {
      const current = this.props.currentBeat === i ? "current" : "";
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
