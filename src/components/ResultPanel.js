import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/txtAction.js';
import v2taudio from '../recording/socket.js';


class ResultPanel extends Component {
  //state = {'result': 'NO_TXT'};

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.updateTxt({transcript_part: '...linje1'});
    this.props.updateTxt({transcript_part: '...linje2'});
    this.props.updateTxt({transcript_part: '...linje3'});
  }

  render() {
    return (
      <div>
        <div className="ResultPanel">
          RESULT PANEL
        </div>
        <div className='current_transcript_part'></div>
        {this.props.transcripts.transcript.map(t => {
          return (
           <div className="transcript_part">{t.transcript_part}</div>
         )
        })}
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  transcripts: state
});

const mapDispatchToProps = (dispatch) => ({
  updateTxt: (txt) => { dispatch(actions.updateTxt(txt)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultPanel);
