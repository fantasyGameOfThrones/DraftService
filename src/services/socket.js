import {io} from './../server/server';
import store from './../redux/store';
import actions from './../redux/actions';

io.on('connection', (socket) => {
  console.log('new client joined');
});

export {io}