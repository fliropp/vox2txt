import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

const sendAudio = (wav) => {
  //socket.on('processAudio', audioStatus => cb(null, audioStatus));
  socket.emit('s2t-request', wav);
  socket.on('s2t-response', txt => {
    //const audioUrl = URL.createObjectURL(new Blob(arrayBuffer, {type: "audio/wav"}));
    const text = document.createElement('mediaDevices');
    text.innerHTML = txt;
    document.body.appendChild(text);
  });
}

export {sendAudio};
