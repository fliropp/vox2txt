import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/txtAction.js';



class EditTranscriptPanel extends Component {

  constructor(props) {
    super(props);
  }

  saveEdit() {
    const txt = document.getElementsByClassName('edit_transcript_txt')[0].getAttribute('value');
    this.props.updateTranscript(txt, this.props.state.active_transcript)
  }

  render() {
    return (
      <div className="transcripts_edit">
        <form>
          <input type="texarea" className="edit_transcript_txt" onChange={() => this.saveEdit()}value={
            this.props.state.transcripts.transcript[this.props.state.transcripts.active_transcript] !== undefined ?
            this.props.state.transcripts.transcript[this.props.state.transcripts.active_transcript].transcript_part :
            '...'
          }>
          </input>
        </form>
      </div>
    );
  }
}

const buttonStyle = {
  margin: '10px 10px 10px 0'
};

const mapStateToProps = (state) => ({
  transcripts: state
});

const mapDispatchToProps = (dispatch) => ({
  updateTranscript: (txt, index) => {dispatch(actions.updateTranscript(txt, index))},
  setActiveTranscript: (index) => {dispatch(actions.setActiveTranscript(index))},
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTranscriptPanel);
