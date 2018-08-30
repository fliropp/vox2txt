import React, { Component } from 'react';
import RecordPanel from './components/RecordPanel.js';
import ResultPanel from './components/ResultPanel.js';
import RecordingFromServer from './components/RecordingFromServer.js';
import { Provider } from 'react-redux';
import store from './reducers/v2tStore.js';
import './App.css';

class App extends Component {

  state = {'status': 'INIT'};

  render() {
    return (
      <Provider store={store}>
        <div>
        <div className="App">
          {this.state.status}
        </div>
        <RecordPanel/>
        <ResultPanel state={this.props}/>
        //<RecordingFromServer/>
        </div>
      </Provider>
    );
  }
}


export default App;
