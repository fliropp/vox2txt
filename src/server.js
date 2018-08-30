const io = require('socket.io')();
const s2t = require('./recording/s2t.js');
const s2tfs = require('./recording/s2tFromServer.js');

io.on('connection', (client) => {
  client.on('s2t-request', (audio) => {
    console.log('audio on server');
    s2t.convert(audio)
    .then((response) => {
      client.emit('s2t-response', response);
    });
  });
  client.on('s2t-external-request', () => {
    s2tfs.convert()
    .then((response) => {
      client.emit('s2t-external-response', response);
    });
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
