import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import * as actions from '../actions/txtAction.js';
import v2taudio from '../recording/socket.js';
import {connect} from 'react-redux';

const codes = [
    {label:'Danish', value: 'da-DK'},
    {label:'English (UK)', value:'en-GB'},
    {label:'English (US)', value:'en-US'},
    {label:'Norwegian (bokmål)', value:'nb-NO'},
    {label:'Swedish', value:'sv-SE'},
    {label:'Deutsch', value:'de-DE'},
    {label:'Finnish', value:'fi-FI'},
]
const languageCode = 'en-US';


class RecordPanel extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='RecordPanel'>
        <div className="RecordButtons">
          <RecordStart state={this.props}/>
        </div>
        <LanguagePicker state={this.props}/>
        <div className='RecordStatus'>
          RECORDING PANEL status: {this.props.transcripts.status}
        </div>
      </div>
    );
  }
}


class RecordStart extends React.Component {
  toggleRecording() {
    switch(this.props.state.transcripts.status) {
      case 'READY':
        this.props.state.startRecording(this.props.state.transcripts.language_code);
        break;
      case 'RECORDING':
        this.props.state.getAudioTranscript();
        break;
      case 'TRANSCRIPT_COMPLETE':
        this.props.state.startRecording(this.props.state.transcripts.language_code);
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

class LanguagePicker extends React.Component {

  constructor(props){
    super(props);
    this._onSelect = this._onSelect.bind(this)
  }

  _onSelect (option) {
   this.props.state.setLanguageCode(option.value);
 }

  render() {
    return(
      <Dropdown
          options={codes}
          onChange={this._onSelect}
          //value={defaultOption}
          placeholder="language" />
    );
  }
}

const mapStateToProps = (state) => ({
  transcripts: state
});

const mapDispatchToProps = (dispatch) => ({
  createTranscript: (txt) => { dispatch(actions.createTranscript(txt)) },
  startRecording: (config) => {dispatch(actions.startRecording(config))},
  getAudioTranscript: () => { dispatch(actions.getAudioTranscript())},
  setLanguageCode: (code) => {dispatch(actions.setLanguageCode(code))}
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordPanel);
