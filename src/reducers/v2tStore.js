import * as actions from '../actions/txtAction.js';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const getInitState = () => {
  return {
    transcript:[],
    error_msg:'',
    status: 'READY',
    active_transcript: 0,
    language_code: 'en-US',
  }
}

const v2tStore = (state = getInitState(), action) => {
  switch (action.type) {
    case actions.CREATE_TRANSCRIPT:
      return {...state, transcript: [...state.transcript, {transcript_part: action.txt}]};
    case actions.UPDATE_TRANSCRIPT:
        return {
          ...state, transcript: state.transcript.map((t,i) => {
            if(action.index === i){
              return {transcript_part: action.txt}
            } else {
              return t;
            }
          })
        };
    case actions.SET_ERROR_MSG:
      return {...state, error_msg: action.err};
    case actions.UPDATE_STATUS:
      return {...state, status: action.status};
    case actions.SET_ACTIVE_TRANSCRIPT:
      return {...state, active_transcript: action.index}
    case actions.SET_LANGUAGE_CODE:
      return {...state, language_code: action.code}
    default:
      return state
  }
}

let store = createStore(v2tStore, applyMiddleware(thunk));
export default store;
