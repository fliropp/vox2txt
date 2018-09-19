import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/txtAction.js';
import v2taudio from '../recording/socket.js';


class ResultPanel extends Component {
  //state = {'result': 'NO_TXT'};

  constructor(props) {
    super(props);
  }

  setActive(i) {
    if (document.getElementById(i) !== null) {
      const previous = document.getElementsByClassName('edit');

      for(let j = 0; j < previous.length; j++) {
        previous[j].classList.remove('edit');
      }
      const current = document.getElementById(i);
      current.classList.add('edit');
      this.props.setActiveTranscript(i);
    }
  }

  updateTranscript(txt, index) {
    this.props.updateTranscript(txt, index);
  }

  render() {
    return (
      <div className="TranscriptPanel">
      <div className="transcripts">
        {this.props.transcripts.transcript.map((t, i) => {
          return (
           <div className="transcriptPart" id={i} onClick={() => this.setActive(i)} dangerouslySetInnerHTML={{__html:t.transcript_part}}></div>
         )
        })}
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  transcripts: state
});

const mapDispatchToProps = (dispatch) => ({
  createTranscript: (txt) => { dispatch(actions.createTranscript(txt)) },
  updateTranscript: (txt, index) => {dispatch(actions.updateTranscript(txt, index))},
  setActiveTranscript: (index) => {dispatch(actions.setActiveTranscript(index))},
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultPanel);
