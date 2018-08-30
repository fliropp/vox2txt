// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient();

const gcsUri = 'gs://s2t_1/ando9.wav';
const encoding = 'WAV';
const languageCode = 'en-IE';


module.exports = {
  convert: async () => {
    return new Promise((resolve, reject) => {
      const config = {
        encoding: encoding,
        languageCode: languageCode,
        enableAutomaticPunctuation: true,
        enableWordConfidence: true,
        interactionType:'DISCUSSION',
        microphoneDistance:'NEARFIELD',
        originalMediaType:'AUDIO',
        recordingDeviceType: 'SMARTPHONE',
        audioTopic: 'live interview with Irish man from Derry, talking about irish punk rock'
      };

      const audio = {
        uri: gcsUri,
      };

      const request = {
        config: config,
        audio: audio,
      };

      // Detects speech in the audio file. This creates a recognition job that you
      // can wait for now, or get its result later.
      console.log('sending yer audio up to the cloud...');
      client
        .longRunningRecognize(request)
        .then(data => {
          const operation = data[0];
          // Get a Promise representation of the final result of the job
          console.log('mr Google is listening...');
          return operation.promise();
        })
        .then(data => {
          const response = data[0];
          const transcription = response.results
            .map(result => result.alternatives[0].transcript)
            .join('\n');
          const confidence = response.results
            .map(result => result.alternatives[0].confidence)
            .join(`\n`);
          console.log('********************************');
          console.log(`Transcription: ${transcription}`);
          console.log(`Confidence: ${confidence}`);
          console.log('********************************');
          resolve(transcription);
        })
        .catch(err => {
          console.error('ERROR:', err);
          reject(new Error(err));
        });

    });
  }
}
