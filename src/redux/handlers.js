
import {io} from './../services/socket.js';
import {List, fromJS} from 'immutable';

export const receiveInitialData = (state, payload) => {
  return payload;
};

export const nextTeam = (state) => {
  let index = state.get('currentTeamIndex');

  if(index === state.get('order').size - 1) {
    return endDraft(state);
  } else {
    index = index + 1;

    return state
      .set('currentTeamIndex', index)
      .set('currentTeamId', state.getIn(['order', index]));
  }
};

export const startDraft = (state) => {
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
    }));
};


export const endDraft = (state) => {
  return state
    .set('draftStatus', 'POST_DRAFT')
    .delete('currentTeamId')
    .delete('currentTeamIndex')
};

//combine these two into one
export const teamLogOn = (state, id) => {
  return state
    .updateIn(
      ['teams'],
      (teams) => teams.map((team) => {
        return team.get('id').toString() === id ? team.set('loggedOn', true) : team;
      })
    );
};

export const teamLogOff = (state, id) => {
  return state
    .updateIn(
      ['teams'],
      (teams) => teams.map((team) => {
        return team.get('id').toString() === id ? team.set('loggedOn', false) : team;
      })
    );
};

export const draftCharacter = (state, pick) => {
  
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
      );
    } else {
      return state;
    }
};

export const initTimer = (state, payload) => {
  return state
    .updateIn(['timer','seconds'], () => payload ? payload.initSeconds : 5)
};

export const startTimer = (state, payload) => {
  return state
    .updateIn(['timer','timerIsRunning'], () => true )
};

export const decrementTimer = (state, payload)=>{
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
    return newState.set('autoDraft', true);
  }
  return newState;
};

export const resetAutoDraft = (state) => {
  return state.set('autoDraft', false);
};

export const stopTimer = (state) => {
  return state
    .updateIn(['timer','timerIsRunning'], () => false)
    .updateIn(['timer','seconds'], () => null)
};
