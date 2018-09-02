import {recorder} from '../recording/recorder.js';

export const CREATE_TRANSCRIPT = 'CREATE_TRANSCRIPT';
export const UPDATE_TRANSCRIPT = 'UPDATE_TRANSCRIPT';
export const UPDATE_STATUS = 'UPDATE_STATUS';
export const SET_ERROR_MSG = 'SET_ERROR_MSG';
export const SET_ACTIVE_TRANSCRIPT = 'SET_ACTIVE_TRANSCRIPT';

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

export const startRecording = () => {
    // We return a function instead of an action object
    return (dispatch) => {
            dispatch(updateStatus('RECORDING'));
            recorder.start();
        }
    };

export const getAudioTranscript = () => {
    return (dispatch) => {
            dispatch(updateStatus('TRANSCRIPT_IN_PROGRESS'));
            recorder.stop()
            .then(r => {
              dispatch(createTranscript('received transcript: ' + r));
              dispatch(updateStatus('TRANSCRIPT_COMPLETE'))
            });
    };
}
