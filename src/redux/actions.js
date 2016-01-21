import store from './store.js';
import fetch from 'isomorphic-fetch';
import {fromJS, toJS, List} from 'immutable';
import {db_url} from './../../env';

export const getInitialData = (id) => {
  return (dispatch) => {
    return fetch(`${db_url}/api/draft/${id}`)
      .then((response)=>response.json())
      .then((data) => {
        data.characterIds = data.characters.map((char) => char.char_id)
        data.order = [];
        data.draftStatus = 'PRE_DRAFT';
        data.teams = data.league.teams.map((team) => {
          team.loggedOn = false;
          team.characters = [];
          return team;
        });
        return data;
      })
      .then((data) => {
        delete data.league.teams;
        delete data.characters;
        return data;
      })
      .then((data) => {
        dispatch({
          type: 'RECEIVE_INITAL_DATA',
          payload: data
        });
      })
      .catch((err)=>{
        console.log(err);
      })
  }
};

export const startDraft = () => {
  store.dispatch({
    type: 'START_DRAFT'
  });
};

export const endDraft = () => {
  store.dispatch({
    type: 'END_DRAFT'
  })
};

export const nextTeam = () => {
  store.dispatch({
    type: 'NEXT_TEAM'
  });
};

export const draftCharacter = (pick) => {
  store.dispatch({
    type: 'DRAFT_CHARACTER',
    payload: pick
  });
};

export const draftRandom = () => {
  store.dispatch({
    type: 'DRAFT_RANDOM'
  });
};

export const teamLogOn = (id) => {
  store.dispatch({
    type: 'TEAM_LOG_ON',
    payload: id
  });
};

export const teamLogOff = (id) => {
  store.dispatch({
    type: 'TEAM_LOG_OFF',
    payload: id
  });
};

export const initTimer = (secs) => {
  store.dispatch({
    type: 'INIT_TIMER',
    payload: {initSeconds:secs}
  });
};

export const resetAutoDraft = () => {
  store.dispatch({
    type: 'RESET_AUTO_DRAFT'
  });
};

export const startTimer = () => {
  store.dispatch({
    type: 'START_TIMER'
  });
};

export const decrementTimer = () => {
  store.dispatch({
    type: 'DECREMENT_TIMER'
  });
};

export const stopTimer = () => {
  store.dispatch({
    type: 'STOP_TIMER'
  });
};

