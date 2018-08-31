import React, { Component } from 'react';
import * as actions from '../actions/txtAction.js';
import v2taudio from '../recording/socket.js';
import {connect} from 'react-redux';



class RecordPanel extends Component {
  state = {'status': 'INIT'};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="RecordPanel">
          RECORDING PANEL status: {this.props.transcripts.status}
        </div>
        <div>
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
        <button style={buttonStyle} onClick={this.props.state.startRecording}>record</button>
    );
  }
}

class RecordStop extends React.Component {
  render() {
    return (
        <button style={buttonStyle} onClick={this.props.state.getAudioTranscript}>stop</button>
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
  updateTxt: (txt) => { dispatch(actions.updateTxt(txt)) },
  startRecording: () => {dispatch(actions.startRecording())},
  getAudioTranscript: () => { dispatch(actions.getAudioTranscript())}
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordPanel);
