import {Timer} from './../services/timer.js';
import {io} from './../services/socket.js';
import {List, fromJS} from 'immutable';


export const nextTeam = (state) => {
  let index = state.get('currentTeamIndex');

  if(index === state.get('order').size - 1) {
    return endDraft(state);
  }else{
    index = index + 1;
    return state
      .set('currentTeamIndex', index)
      .set('currentTeamId', state.getIn(['order', index]));
  }
};

export const endDraft = (state) => {
  return state
    .set('draftStatus', 'POST_DRAFT');
};

export const startDraft = (state) => {
  let order = state.get('teams')
    .filter((team) => team.get('loggedOn'))
    .map((team) => team.get('id'))
    .sort((a,b) => Math.random() > .5);
  let order2 = order.concat(order.reverse());
  let order3 = order2.concat(order2.concat(order2));
  return state
    .merge(fromJS({
      order: order,
      draftStatus: 'MID_DRAFT',
      currentTeamIndex: 0,
      currentTeamId: order.get(0)
    }));
};

//combine these two into one
export const teamLogOn = (state, id) => {
  return state
    .updateIn(
      ['teams'],
      (teams) => teams.map((team) => {
        return team.get('id').toString() === id ? team.set('loggedOn',true) : team;
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
    .updateIn(
      ['characterIds'],
      (ids) => ids.splice(char_index, 1)
    );
};

export const draftRandom = (state) => {
  let char_index = Math.random() * state.get('characterIds').size | 0;

  let pick = {
    team_id: state.get('currentTeamId'),
    char_id: state.getIn(['characterIds', char_index])
  };

  return draftCharacter(state, pick);
};

let timer;

export const startTimer = (state, payload) => {
  if(!state.timerIsRunning) {
    timer = new Timer(2);
    timer.start(payload.viewUpdate, payload.alarm);
  }
  return state;
};

export const stopTimer = (state) => {
  // console.log('timer', timer);
  timer.stop();
  return state;
};
