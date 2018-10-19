import React, { Component } from "react";
import abcjs from 'abcjs';

class Note extends Component {
  constructor(props) {
    super(props);
  }

  renderNote() {
    this.note = `X:1\nL:1/4\nM:none\nK: C clef= ${this.props.clef}\n${
      this.props.abc
    }`;

    abcjs.renderAbc(
      this.props.id,
      this.note,
      {},
      {
        scale: this.props.scale
      }
    );
    document.getElementById(this.props.id).style.width = this.props.width;
  }

  componentWillReceiveProps() {
    this.renderNote();    
  }

  componentDidMount() {
    this.renderNote();
  }

  componentDidUpdate(prevProps, prevState) {
    this.renderNote();
  }

  render() {
    return (
      <div>
        <div
          id={this.props.id}
          className={this.props.className}
        />
      </div>
    );
  }
}

export default Note;

