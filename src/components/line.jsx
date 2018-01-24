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
      muted: false,
    };
    this.updateNotes = this.updateNotes.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return (
      // It should update only when
      // 1. props' currentBeat is even
      // 2. && there is a truthy value at this.state.line at prop's current beat
      (
        nextProps.currentBeat % 2 === 0
        && this.state.line[Math.floor(nextProps.currentBeat / 2)]
      ) ||
      // 3. Even if the above two don't hold, we should update
      // if the previous beat's was truthy
      (
        this.props.currentBeat % 2 === 1
        && this.state.line[Math.floor(this.props.currentBeat / 2)]
      ) ||
      // 4. We should also be able to update the component when state.line
      // has changed
      (
        JSON.stringify(this.state.line) !== JSON.stringify(nextState.line)
      ) ||
      // 5. We should also update if state.muted has changed
      (
        this.state.muted !== nextState.muted
      )
    );
  }
  
  componentDidMount() {
    this.updateNotes();
  }
  
  updateNotes() {
    this.setState({ line: this.props.instrument.getLine(this.props.note) });
  }
  
  toggleMute() {
    const instrument = this.props.instrument;
    if (instrument.isMuted(this.props.note)) {
      instrument.unmute(this.props.note);
    } else {
      instrument.mute(this.props.note);
    }
    this.setState({ muted: instrument.isMuted(this.props.note) });
  }
  
  handleClick(i) {
    const instrument = this.props.instrument;
    const note = this.props.note;
    return () => {
      if (this.state.line[i]) {
        instrument.removeNote(note, i * 2);
        this.setState({ line: instrument.getLine(note) });
      } else {
        instrument.addNote(note, i * 2);
        this.setState({ line: instrument.getLine(note) });
      }
    };
  }
  
  renderSquares() {
    return this.state.line.map((bool, i) => {
      const active = bool ? "active" : "";
      const current = Math.floor(this.props.currentBeat / 2) === i && active ? "current" : "";
      const measureStart = i % 8 === 0 ? "start-measure" : "";
      return (
        <div className={`line-square wide ${current} ${active} ${measureStart}`}
          onClick={this.handleClick(i)}
          key={i}>
        </div>
      );
    });
  }
  
  render () {
    const muted = this.state.muted ? "muted" : "";
    return (
      <div className="line">
        <div className="line-note-title">{this.props.note}</div>
        <div className={`line-note-mute ${muted}`}
          onClick={this.toggleMute}>
          <i className={`fa fa-volume-${muted ? "off" : "up"}`} aria-hidden="true"></i>
        </div>
        {this.renderSquares()}
      </div>
    );
  }
}

export default Line;
