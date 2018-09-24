

'use strict';

const speech = require('@google-cloud/speech');
const fs = require('fs');
const client = new speech.SpeechClient();

// The name of the audio file to transcribe
//const fileName = './resources/audio.raw';

// Reads a local audio file and converts it to base64
//const file = fs.readFileSync(fileName);
module.exports = {
  convert: async (input, lang) => {
    return new Promise((resolve, reject) => {
      const audio = {
        content: input,
      };
      const config = {
        encoding: 'WAV',
        sampleRateHertz: 44100,
        languageCode: lang,
        phrases: ['format heading one', 'format heading two', 'format heading three', 'format heading four', 'format bold', 'format italics'],
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
          resolve(transcription);
        })
        .catch(err => {
          console.error('ERROR:', err);
          reject(Error(err));
        });
      });
    }
}
