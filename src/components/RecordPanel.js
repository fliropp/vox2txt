import React, { Component } from 'react';
import {recorder} from '../recording/recorder.js';
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
          RECORDING PANEL
        </div>
        <div>
          <RecordStart/>
          <RecordStop/>
        </div>
      </div>
    );
  }
}

const stopRecording = () => {
  recorder.stop((result) => {
    this.props.updateTxt(result);
  })
}

class RecordStart extends React.Component {
  render() {
    return (
        <button style={buttonStyle} onClick={recorder.start}>record</button>
    );
  }
}

class RecordStop extends React.Component {
  render() {
    return (
        <button style={buttonStyle} onClick={stopRecording}>stop</button>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordPanel);
