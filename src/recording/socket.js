import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

const sendAudio = (wav, cb) => {
  socket.emit('s2t-request', wav);
  socket.on('s2t-response', txt => {
    //const result = document.querySelector('.current_transcript_part');
    //result.innerHTML = txt;
    cb(txt);
  });
}

const v2taudio = (wav, cb) => {
  socket.emit('s2t-request', wav);
  socket.on('s2t-response', txt => {
    cb(txt);
  });
}

const triggerExternalAudio = () => {
  socket.emit('s2t-external-request');
  socket.on('s2t-external-response', txt =>{
    const result = document.querySelector('.current_transcript_part');
    result.innerHTML = txt;
  });
}

export {sendAudio, triggerExternalAudio};
