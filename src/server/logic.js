import * as actions from './../redux/actions';
import {io} from './../services/socket';
import store from './../redux/store';
import http from 'http';

store.dispatch(actions.getInitialData());

let timerInterval = null;

io.on('connection', (socket) => {

  const updateView = (timeObj) => {
    io.emit('timeUpdate', timeObj);
  };

  // refactor draftCharacter function, pull out socket listeners
  // perhaps put store.subscribe elsewhere too. 

  const draftCharacter = (pick) => { 
    if(pick.team_id === store.getState().get('currentTeamId').toString()) {
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
      let options = {
        host: 'http://localhost:3000/results',
        method: 'POST',
        data: {league_id:state.get('league_id'),teams: state.get('teams')}
      };
      console.log('DATA TO SEND', options);
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
  });

  socket.on('moose', ()=>{
    console.log('moose');
    socket.emit('lemur');
  });

});
