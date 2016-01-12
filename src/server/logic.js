import * as actions from './../redux/actions';
import {io} from './../services/socket';
import store from './../redux/store';


io.on('connection', (socket) => {

  const updateView = (timeObj) => {
    io.emit('timeUpdate', timeObj);
  };

  const alarm = (timeObj) => {
    if(store.getState().get('draftStatus') === 'MID_DRAFT'){
      actions.draftRandom()
      actions.nextTeam()
      actions.startTimer(updateView, alarm)
    }
  };

  store.subscribe(() => {
    let state = store.getState()
    socket.emit('updateStore', state);
    if(state.get('draftStatus' === 'POST_DRAFT')) {
      console.log('DATA TO SEND', {league_id:state.get('league_id'),teams: state.get('teams')});
    }
  });

  socket.on('startDraft', () => {
    actions.startDraft();
    actions.startTimer(updateView, alarm);
  });

  socket.on('startTimer', () => {
    actions.startTimer(updateView, alarm);
  });

  socket.on('stopTimer', () => {
    actions.stopTimer();
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
