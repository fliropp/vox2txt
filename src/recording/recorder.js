const fs = require('fs');
const arrayBufferToAudioBuffer = require('arraybuffer-to-audiobuffer');
const audioBufferToWav = require('audiobuffer-to-wav');
const socket = require('./socket.js');

const recorder = {
    rec: () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia supported.');
        navigator.mediaDevices.getUserMedia({audio: true})
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.start();
          const audioChunks = [];

          mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
            console.log('chunk pushed');
          });

          mediaRecorder.addEventListener("stop", () => {
            console.log(mediaRecorder.state);
            const blob = new Blob(audioChunks, {type:'audio/wav'});

            let fileReader = new FileReader();
            let arrayBuffer;
            let wav;

            fileReader.onloadend = (e) => {
              arrayBuffer = e.target.result;
              arrayBufferToAudioBuffer(arrayBuffer)
              .then((audioBuffer) => {
                wav = audioBufferToWav(audioBuffer);
                socket.sendAudio(wav);
              })
            };
            fileReader.readAsArrayBuffer(blob);
          });

          setTimeout(() => {
            mediaRecorder.stop();
          }, 3000);
        })
        .catch((err) => {
          console.log('The following getUserMedia error occured: ' + err);
        });
      } else {
        console.log('getUserMedia not supported on your browser!');
      }
      return 'Media Rec init OK'
    }
  }

export {recorder};
