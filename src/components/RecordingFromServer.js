import React, { Component } from 'react';
import {recorder} from '../recording/recorder.js';


class RecordingFromServer extends Component {
  state = {'result': 'NO_TXT'};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="ResultPanel">
          RUN RECORDING FROM SERVER
        </div>
        <button style={buttonStyle} onClick={recorder.external}>run from server</button>
        <div className='rec-from-server-result'>
        </div>
      </div>
    );
  }
}

const buttonStyle = {
  margin: '10px 10px 10px 0'
};

export default RecordingFromServer;
