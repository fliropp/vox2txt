import React, { Component } from 'react';
import * as actions from '../actions/txtAction.js';
import v2taudio from '../recording/socket.js';
import {connect} from 'react-redux';



class RecordPanel extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className='RecordHeader'>
          RECORDING PANEL status: {this.props.transcripts.status}
        </div>
        <div className="RecordButtons">
          <RecordStart state={this.props}/>
          <RecordStop state={this.props}/>
        </div>
      </div>
    );
  }
}


class RecordStart extends React.Component {

  render() {
    return (
        <button className='recStart' onClick={this.props.state.startRecording}>record</button>
    );
  }
}

class RecordStop extends React.Component {
  render() {
    return (
        <button className='recStop' onClick={this.props.state.getAudioTranscript}>stop</button>
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
  createTranscript: (txt) => { dispatch(actions.createTranscript(txt)) },
  startRecording: () => {dispatch(actions.startRecording())},
  getAudioTranscript: () => { dispatch(actions.getAudioTranscript())}
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordPanel);
