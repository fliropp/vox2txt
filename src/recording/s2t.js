

'use strict';

const speech = require('@google-cloud/speech');
const fs = require('fs');
const client = new speech.SpeechClient();

// The name of the audio file to transcribe
//const fileName = './resources/audio.raw';

// Reads a local audio file and converts it to base64
//const file = fs.readFileSync(fileName);
module.exports = {
  convert: (input) => {
    //const audioBytes = input.toString('base64');
    //const audioBytes = fs.createReadStream(input);//.pipe(recognizeStream);

    const audio = {
      content: input,
    };
    const config = {
      encoding: 'LINEAR',
      sampleRateHertz: 44100,
      languageCode: 'en-US',
    };
    const request = {
      audio: audio,
      config: config,
    };

    client
      .recognize(request)
      .then(data => {
        const response = data[0];
        const transcription = response.results
          .map(result => result.alternatives[0].transcript)
          .join('\n');
        console.log(`Transcription: ${transcription}`);
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
    }
}
