import React, { Component } from 'react';
import {recorder} from './recording/recorder.js';
import './App.css';

class App extends Component {

  state = {'status': 'INIT'};

  render() {
    return (
      <div>
        <div className="App">
          {this.state.status}
        </div>
        <Vox2Txt/>
      </div>
    );
  }
}

class Vox2Txt extends React.Component {
  render() {
    return (
      <div>
        <div className='record'>{recorder.rec()}</div>
        <div className='stop'/>
        <div className='source-clips'/>
      </div>
    );
  }
}

class RecordStop extends React.Component {
  render() {
    return (
        <button style={buttonStyle}>stop</button>
    );
  }
}

const buttonStyle = {
  margin: '10px 10px 10px 0'
};

export default App;
