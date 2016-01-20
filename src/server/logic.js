import * as actions from './../redux/actions';
import {io} from './../services/socket';
import store from './../redux/store';
import {db_url, league_id} from './../../env';

let timerInterval = null;



io.on('connection', (socket) => {

  socket.emit('sendLeagueId');

  socket.on('returnLeagueId', (data) => {
    if(!store.getState().get('draftStatus')) {
      store.dispatch(actions.getInitialData(data.league_id));
    }
  });

  const updateView = (timeObj) => {
    io.emit('timeUpdate', timeObj);
  };

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
        host: `${process.env.db_url}/api/draft/:draftId`,
        method: 'POST',
        data: {league_id:state.getIn(['league','league_id']),teams: state.get('teams')}
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

  socket.on('moose', () => {
    console.log('moose');
    socket.emit('lemur');
  });

});
