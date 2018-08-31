import {recorder} from '../recording/recorder.js';

export const UPDATE_TXT = 'UPDATE_TXT';
export const UPDATE_STATUS = 'UPDATE_STATUS';
export const SET_ERROR_MSG = 'SET_ERROR_MSG';

export const updateTxt  = (txt) => {
  return { type: UPDATE_TXT , txt};
}

export const updateStatus  = (status) => {
  return { type: UPDATE_STATUS , status};
}

export const setError = (err) => {
  return {type: SET_ERROR_MSG, err}
}

export const startRecording = () => {
    // We return a function instead of an action object
    return (dispatch) => {
            dispatch(updateStatus('RECORDING'));
            recorder.start();
        }
    };

export const getAudioTranscript = () => {
    return (dispatch) => {
            dispatch(updateStatus('ANALYZING'));
            recorder.stop()
            .then(r => {dispatch(updateTxt('received transcript: ' + r))});
    };
}
