import {recorder} from '../recording/recorder.js';

export const CREATE_TRANSCRIPT = 'CREATE_TRANSCRIPT';
export const UPDATE_TRANSCRIPT = 'UPDATE_TRANSCRIPT';
export const UPDATE_STATUS = 'UPDATE_STATUS';
export const SET_ERROR_MSG = 'SET_ERROR_MSG';
export const SET_ACTIVE_TRANSCRIPT = 'SET_ACTIVE_TRANSCRIPT';
export const SET_LANGUAGE_CODE = 'SET_LANGUAGE_CODE';

export const createTranscript  = (txt) => {
  return { type: CREATE_TRANSCRIPT , txt};
}

export const updateTranscript = (txt, index) => {
  return {type: UPDATE_TRANSCRIPT, txt, index};
}

export const updateStatus  = (status) => {
  return { type: UPDATE_STATUS , status};
}

export const setError = (err) => {
  return {type: SET_ERROR_MSG, err}
}

export const setActiveTranscript = (index) => {
  return {type: SET_ACTIVE_TRANSCRIPT, index}
}

export const setLanguageCode = (code) => {
  return {type: SET_LANGUAGE_CODE, code}
}

export const startRecording = (config) => {
    // We return a function instead of an action object
    return (dispatch) => {
            dispatch(updateStatus('RECORDING'));
            recorder.start(config);
        }
    };

export const getAudioTranscript = () => {
    return (dispatch) => {
            dispatch(updateStatus('TRANSCRIPT_IN_PROGRESS'));
            recorder.stop()
            .then(r => {
              dispatch(createTranscript(format(r)));
              dispatch(updateStatus('TRANSCRIPT_COMPLETE'))
            });
    };
}
let closeMarkup = '';
let newTxt = '';

const format = (txt) => {
  if(txt.toLowerCase().indexOf('format ') > -1) {
    format(addMarkup(txt))
  } else {
    return addMarkup(txt);
  }
}

const addMarkup = (txt) => {
    if (txt.toLowerCase().indexOf('format heading 1') > -1) {
        newTxt = txt.replace('format heading 1', closeMarkup + '<h1>');
        closeMarkup = '</h1>';
        return newTxt;
    }
    if (txt.toLowerCase().indexOf('format heading one') > -1) {
        newTxt = txt.replace('format heading one', closeMarkup + '<h1>');
        closeMarkup = '</h1>';
        return newTxt;
    }
    if (txt.toLowerCase().indexOf('format heading 2') > -1) {
        newTxt = txt.replace('format heading 2', closeMarkup + '<h2>');
        closeMarkup = '</h2>';
        return newTxt;
    }
    if (txt.toLowerCase().indexOf('format heading two') > -1) {
        newTxt = txt.replace('format heading two', closeMarkup + '<h2>');
        closeMarkup = '</h2>';
        return newTxt;
    }
    if (txt.toLowerCase().indexOf('format bold') > -1) {
        newTxt = txt.replace('format bold', closeMarkup + '<b>');
        closeMarkup = '</b>';
        return newTxt;
    }
    if (txt.toLowerCase().indexOf('format normal') > -1) {
        newTxt = txt.replace('format normal', closeMarkup);
        closeMarkup = '';
        return newTxt;
    }
    return txt + closeMarkup;
  }
