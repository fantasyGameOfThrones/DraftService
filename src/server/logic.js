import * as actions from './../redux/actions';
import {io} from './../services/socket';
import store from './../redux/store';


let timerInterval = null;

io.on('connection', (socket) => {

  const updateView = (timeObj) => {
    io.emit('timeUpdate', timeObj);
  };

  const draftCharacter = (pick) => { 
    if(pick.team_id === store.getState().get('currentTeamId').toString()) {
      console.log('draftChar func ', pick);
      stopTimer();
      actions.draftCharacter(pick);
      actions.nextTeam();
      actions.initTimer();
      startTimer();
    }
  };

  store.subscribe(() => {
    let state = store.getState()
    socket.emit('updateStore', state);
    if(state.get('autoDraft')) {

      actions.resetAutoDraft();
      
      let char_index = Math.random() * state.get('characterIds').size | 0;
      
      let pick = {
        team_id: state.get('currentTeamId').toString(),
        char_id: state.getIn(['characterIds', char_index])
      };

      draftCharacter(pick);
    }
    if(state.get('draftStatus') === 'POST_DRAFT' && state.getIn(['timer','timerIsRunning'])) {
      stopTimer();
      console.log('DATA TO SEND', {league_id:state.get('league_id'),teams: state.get('teams')});
    }
  });

  const startTimer = () => {
    timerInterval = setInterval(actions.decrementTimer, 1000);
    actions.startTimer();
  };

  const stopTimer = () => {
    clearInterval(timerInterval);
    actions.stopTimer();
  };

  socket.on('startDraft', () => {
    actions.startDraft();
    actions.initTimer();
    startTimer();
  });

  socket.on('startTimer', () => {
    stopTimer();
    actions.initTimer();
    startTimer();
  });

  socket.on('stopTimer', () => {
    stopTimer();
  });

  socket.on('init', (data) => {
    actions.teamLogOn(data);
  });




  socket.on('draftCharacter', (pick) => {
    draftCharacter(pick);
  })

});
