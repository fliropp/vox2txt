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
        </div>
      </div>
    );
  }
}


class RecordStart extends React.Component {
  toggleRecording() {
    switch(this.props.state.transcripts.status) {
      case 'READY':
        this.props.state.startRecording();
        break;
      case 'RECORDING':
        this.props.state.getAudioTranscript();
        break;
      default:
        break;
    }
  }
  render() {
    let classAttribute = 'recStart ' + this.props.state.transcripts.status;
    return (
        <button className={classAttribute} onClick={() => this.toggleRecording()}>record</button>
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
