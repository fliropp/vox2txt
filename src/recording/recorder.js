const fs = require('fs');
const arrayBufferToAudioBuffer = require('arraybuffer-to-audiobuffer');
const audioBufferToWav = require('audiobuffer-to-wav');
const socket = require('./socket.js');

const audioReadyEvent = new CustomEvent('transcriptReady');
let mediaRecorder;

const recorder = {
    start: () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia supported.');
        navigator.mediaDevices.getUserMedia({audio: true})
        .then((stream) => {
          mediaRecorder = new MediaRecorder(stream);
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
            let repsonse = "";

            fileReader.onloadend = (e) => {
              arrayBuffer = e.target.result;
              arrayBufferToAudioBuffer(arrayBuffer)
              .then((audioBuffer) => {
                wav = audioBufferToWav(audioBuffer);
                socket.sendAudio(wav, (res) => {
                  audioReadyEvent.data = res;
                  window.dispatchEvent(audioReadyEvent);
                  return res;
                });
              })
            };
            fileReader.readAsArrayBuffer(blob);
          });

          /*setTimeout(() => {
            mediaRecorder.stop();
          }, 3000);*/
        })
        .catch((err) => {
          console.log('The following getUserMedia error occured: ' + err);
        });
      } else {
        console.log('getUserMedia not supported on your browser!');
      }
      return 'Media Rec init OK'
    },
    stop : () => {
      return new Promise ((resolve, reject) => {
        if (mediaRecorder != undefined && mediaRecorder.state !== 'inactive'){
          mediaRecorder.stop();
          window.addEventListener('transcriptReady', (trscpt) => {
            resolve(trscpt.data);
          });
        } else {
          reject('no tro lo lo lo fo yo');
        }
      });
    },
    external : () => {
      socket.triggerExternalAudio();
    }


  }

export {recorder};
