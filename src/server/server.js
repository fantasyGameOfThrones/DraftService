import express from 'express';
import IO from 'socket.io';

const app = express();
export const io = IO.listen(app.listen(8080));

console.log(`
  ##############################################################
  ###                 GREETINGS HUMAN                        ###
                i can socket @ ${process.env.SOCKET_URL} 
                also, db_urL: ${process.env.DB_URL}                
  ###                       ^_^                              ###
  ##############################################################
`);

app.use('/',express.static(__dirname + '/../../client'));






