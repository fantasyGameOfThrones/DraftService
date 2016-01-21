import * as actions from './../redux/actions';
import {io} from './../services/socket';
import store from './../redux/store';
import {db_url} from './../../config';
import request from 'request';

let timerInterval = null;


io.on('connection', (socket) => {
  socket.emit('sendLeagueId');

  socket.on('returnLeagueId', (data) => {

    if(!store.getState().draftStatus) {
      store.dispatch(actions.getInitialData(data.league_id));
    }
  });

  const updateView = (timeObj) => {
    io.emit('timeUpdate', timeObj);
  };

  const draftCharacter = (pick) => { 
    if(pick.team_id === store.getState().currentTeamId.toString()) {
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

    if(state.autoDraft) {
      actions.resetAutoDraft();
      
      let char_index = Math.random() * state.characterIds.length | 0;
      
      let pick = {
        team_id: state.currentTeamId.toString(),
        char_id: state.characterIds[char_index]
      };

      draftCharacter(pick);
    }

    if(state.draftStatus === 'POST_DRAFT' && state.timer.timerIsRunning) {
      stopTimer();
      var url = `${db_url}/api/draft/${state.league.league_id}`;
      console.log(url);
      request.post(url,{league_id:state.league.league_id,teams: state.teams});
      // let options = {
      //   host: `${db_url}/api/draft/:draftId`,
      //   method: 'POST',
      //   data: {league_id:state.league.league_id,teams: state.teams}
      // };
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

  socket.on('reset', (id=1)=> {
    store.dispatch(actions.getInitialData(id));
    stopTimer();
  })

  socket.on('moose', () => {
    console.log('moose');
    socket.emit('lemur');
  });

});
