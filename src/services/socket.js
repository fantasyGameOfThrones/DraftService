import {io} from './../server/server';

io.on('connection', (socket) => {
  console.log('new client joined');
});

export {io}