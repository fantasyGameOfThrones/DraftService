import express from 'express';
import IO from 'socket.io';

const app = express();
export const io = IO.listen(app.listen(8080));

const host = process.env.HOST || 'localhost:8080';

console.log(`
  ##############################################################
  ###                 GREETINGS HUMAN                        ###
                i can socket @ ${host}                 
  ###                       ^_^                              ###
  ##############################################################
`);

app.use('/',express.static(__dirname + '/../../client'));






