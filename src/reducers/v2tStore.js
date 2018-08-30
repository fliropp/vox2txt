import * as actions from '../actions/txtAction.js';
import {createStore} from 'redux';

const getInitState = () => {
  return {
    transcript:[]
  }
}

const v2tStore = (state = getInitState(), action) => {
  switch (action.type) {
    case actions.UPDATE_TXT:
      return {...state, transcript: [...state.transcript, action.txt]}
    default:
      return state
  }
}

let store = createStore(v2tStore);
export default store;
