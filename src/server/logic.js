import * as actions from './../redux/actions';
import {io} from './../services/socket';
import store from './../redux/store';


io.on('connection', (socket) => {

  const updateView = (timeObj) => {
    io.emit('timeUpdate', timeObj);
  };

  const alarm = (timeObj) => {
    actions.draftRandom()
    actions.nextTeam()
    actions.startTimer(updateView,alarm)
  };

  store.subscribe(() => {
    socket.emit('updateStore', store.getState());
  });

  socket.on('startDraft', () => {
    console.log('draft starting');
    actions.startDraft();
    actions.startTimer(updateView, alarm);
  });

  socket.on('startTimer', () => {
    actions.startTimer();
  });

  socket.on('init', (data) => {
    actions.teamLogOn(data);
  });

  socket.on('draftCharacter', (pick) => {
    if(pick.team_id === store.getState().get('currentTeamId').toString()) {
      actions.stopTimer();
      actions.draftCharacter(pick);
      actions.nextTeam();
      actions.startTimer(updateView, alarm);
    }
  })

});
