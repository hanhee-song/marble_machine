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
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentBeat === -1) {
      this.updateNotes();
    }
    if (nextProps.mm !== this.props.mm) {
      this.updateNotes();
    }
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return (
      // It should update only when
      // 1. There is a truthy value at this.state.line at prop's current beat
      (
        this.state.line[nextProps.currentBeat]
      ) ||
      // 2. Even if the above doesn't hold, we should update
      // if the previous beat's was truthy
      (
        this.state.line[this.props.currentBeat]
      ) ||
      // 3. We should also be able to update the component when state.line
      // has changed
      (
        JSON.stringify(this.state.line) !== JSON.stringify(nextState.line)
      ) ||
      // 5. We should also update if state.muted has changed
      (
        this.state.muted !== nextState.muted
      ) ||
      // 6. We'll make it update when nextProps.currentBeat is -1
        // i.e. the board was initialized OR reset
      (
        nextProps.currentBeat === -1
      )
    );
  }
  
  componentDidMount() {
    this.updateNotes();
    this.props.instrument.setUpdateComponentCallback(this.updateNotes, this.props.note);
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
        instrument.removeNote(note, i);
        instrument.playNote(note);
      } else {
        instrument.addNote(note, i);
        instrument.playNote(note);
      }
      this.updateNotes();
    };
  }
  
  renderSquares() {
    return this.state.line.map((bool, i) => {
      const active = bool ? "active" : "";
      const current = this.props.currentBeat === i && active ? "current" : "";
      return (
        <div className={`square ${active} ${current}`}
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
        <div className="note-title">{this.props.note}</div>
        <div className={`note-mute ${muted}`}
          onClick={this.toggleMute}>
          <i className={`fa fa-volume-${muted ? "off" : "up"}`} aria-hidden="true"></i>
        </div>
        {this.renderSquares()}
      </div>
    );
  }
}

export default Line;
