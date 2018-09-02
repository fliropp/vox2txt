import React, { Component } from 'react';
import RecordPanel from './components/RecordPanel.js';
import ResultPanel from './components/ResultPanel.js';
import RecordingFromServer from './components/RecordingFromServer.js';
import { Provider } from 'react-redux';
import store from './reducers/v2tStore.js';
import './App.css';

class App extends Component {


  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <RecordPanel state={this.props} className="RecordPanel"/>
          <ResultPanel state={this.props} className="ResultPanel"/>
        </div>
      </Provider>
    );
  }
}


export default App;
