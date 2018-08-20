const io = require('socket.io')();
const s2t = require('./recording/s2t.js')

io.on('connection', (client) => {
  client.on('s2t-request', (audio) => {
    console.log('audio on server');
    s2t.convert(audio)
    .then((response) => {
      client.emit('s2t-response', response);
    });
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
