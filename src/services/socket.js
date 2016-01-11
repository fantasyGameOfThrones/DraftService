import {io} from './../server/server.js';

io.on('connection', () => {
  console.log('new client joined');
});

export {io}