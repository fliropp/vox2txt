import * as actions from '../actions/txtAction.js';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const getInitState = () => {
  return {
    transcript:[],
    error_msg:'',
    status: 'IDLE'
  }
}

const v2tStore = (state = getInitState(), action) => {
  switch (action.type) {
    case actions.UPDATE_TXT:
      return {...state, transcript: [...state.transcript, {transcript_part: action.txt}]};
    case actions.SET_ERROR_MSG:
      return {...state, error_msg: action.err};
    case actions.UPDATE_STATUS:
      return {...state, status: action.status};
    default:
      return state
  }
}

let store = createStore(v2tStore, applyMiddleware(thunk));
export default store;
