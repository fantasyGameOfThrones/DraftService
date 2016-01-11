import express from 'express';
import IO from 'socket.io';
import Timer from './../services/Timer';



const app = express();
export const io = IO.listen(app.listen(8080));

// setInterval(actions.increment.bind(this),1000);

app.use('/',express.static(__dirname + '/../../client'));

// app.get('/add', (req, res) => {
//   store.dispatch({type:'INCREMENT'});
//   res.redirect('/');
// });




