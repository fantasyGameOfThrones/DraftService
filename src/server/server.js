import express from 'express';
import IO from 'socket.io';
import {socket_url, socket_port} from './../../config';

const app = express();
export const io = IO.listen(app.listen(socket_port));

console.log(`
  ##############################################################
  ###                 GREETINGS HUMAN                        ###
                i can socket @ ${socket_url}                 
  ###                       ^_^                              ###
  ##############################################################
`);

app.use('/',express.static(__dirname + '/../../client'));






