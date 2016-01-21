
import {io} from './../services/socket.js';
import {List, fromJS, toJS} from 'immutable';

export const receiveInitialData = (state, payload) => {
  return payload;
};

export const nextTeam = (state) => {

  let index = state.currentTeamIndex;

  if(index === state.order.length - 1) {
    return endDraft(state);
  } else {
    index = index + 1;
    state.currentTeamIndex = index;
    state.currentTeamId = state.order[index];
    return state;
  }
};

export const startDraft = (s) => {
  let state = fromJS(s);
  let order = state.get('teams')
    .filter((team,key) => team.get('loggedOn'))
    .map((team,key) => team.get('id'))
    .sort((a,b) => Math.random() > .5);
  let order2 = order.concat(order.reverse());
  let order3 = order2.concat(order2.concat(order2));
  return state
    .merge(fromJS({
      order: order3,
      draftStatus: 'MID_DRAFT',
      currentTeamIndex: 0,
      currentTeamId: order3.get(0)
    }))
    /***/
    .toJS();
};

export const endDraft = (s) => {
  let state = fromJS(s);
  return state
    .set('draftStatus', 'POST_DRAFT')
    .delete('currentTeamId')
    .delete('currentTeamIndex')
    /***/
    .toJS();
};

//combine these two into one
export const teamLogOn = (s, id) => {
  let state = fromJS(s);
  return state
    .updateIn(
      ['teams'],
      (teams) => teams.map((team) => {
        return team.get('id').toString() === id ? team.set('loggedOn', true) : team;
      })
    )
    /***/
    .toJS();
};


export const teamLogOff = (s, id) => {
  let state = fromJS(s);
  return state
    .updateIn(
      ['teams'],
      (teams) => teams.map((team) => {
        return team.get('id').toString() === id ? team.set('loggedOn', false) : team;
      })
    )
    /***/
    .toJS();
};

export const draftCharacter = (s, pick) => {
  let state = fromJS(s);
  
  if(state.get('draftStatus') === 'MID_DRAFT') {

    let team_index = state.get('teams')
      .map((team) => team.get('id').toString())
      .indexOf(pick.team_id.toString());

    let char_index = state.get('characterIds')
      .indexOf(pick.char_id);

    return state
      .updateIn(
        ['teams',team_index,'characters'],
        (characters) => characters.push(pick.char_id)
      )
      .updateIn (
        ['characterIds'],
        (ids) => ids.splice(char_index, 1)
      )
      /***/
      .toJS();
    
    } else {
      return state
        /***/
      .toJS();
    }
};

export const initTimer = (state, payload) => {
  state.timer.seconds = 5;
  return state;
};

export const startTimer = (state, payload) => {
  state.timer.timerIsRunning = true;
  return state;
};

export const decrementTimer = (s, payload)=>{
  let state = fromJS(s);
  let autoDraft = false;
  let newState = state
    .updateIn(['timer','seconds'],
      (seconds) => {
        seconds = seconds - 1;
        if(seconds === 0) {
          autoDraft = true;
        }
        return seconds;
      });
  if(autoDraft) {
    return newState.set('autoDraft', true)
      /***/
    .toJS();
  }
  return newState
    /***/
    .toJS();
};

export const resetAutoDraft = (state) => {
  state.autoDraft = false;
  return state;
};

export const stopTimer = (state) => {
  state.timer.timerIsRunning = false;
  state.timer.seconds = null;
  return state;
};

