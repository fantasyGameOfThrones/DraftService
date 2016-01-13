import store from './store.js';
import fetch from 'isomorphic-fetch';
import {fromJS, List} from 'immutable';

export const getInitialData = () => {
  return (dispatch) => {
    return fetch('http://localhost:3000/draft')
      .then((response)=>response.json())
      .then((data) => {
        return fromJS(data)
          .updateIn(
            ['characters'],
            (characters) => characters.map((char)=>char.get('char_id'))
          )
          .updateIn(
            ['order'],
            () => new List()
          )
          .updateIn(
            ['draftStatus'],
            () => 'PRE_DRAFT'
          )
          .updateIn(
            ['league','teams'],
            (teams) => teams.map((team) => {
              return team
                .set('loggedOn',false)
                .set('characters', new List())
            })
          )
      })
      .then((data) => {
        return data
          .set('teams', data.getIn(['league','teams']))
          .deleteIn(['league','teams'])
          .set('characterIds', data.get('characters'))
          .delete('characters')
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

export const initTimer = () => {
  store.dispatch({
    type: 'INIT_TIMER'
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
