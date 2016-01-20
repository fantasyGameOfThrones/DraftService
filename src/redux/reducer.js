import {List, Map, fromJS} from 'immutable';
import * as handlers from './handlers';
import fetch from 'isomorphic-fetch'


let DEFAULT_STATE = new Map();

// todo: pull out timer into own reducer
export default (state = DEFAULT_STATE, action) => {

  switch(action.type) {
    case "RECEIVE_INITAL_DATA":
      return handlers.receiveInitialData(state, action.payload);
    case "TEAM_LOG_ON":
      return handlers.teamLogOn(state, action.payload);
    case "TEAM_LOG_OFF":
      return handlers.teamLogOff(state, action.payload);
    case 'START_DRAFT':
      return handlers.startDraft(state);
    case 'END_DRAFT':
      return handlers.endDraft(state);
    case "INIT_TIMER":
      return handlers.initTimer(state, action.payload);
    case "START_TIMER":
      return handlers.startTimer(state);
    case "DECREMENT_TIMER":
      return handlers.decrementTimer(state);
    case "STOP_TIMER":
      return handlers.stopTimer(state);
    case "DRAFT_CHARACTER":
      return handlers.draftCharacter(state, action.payload);
    case "DRAFT_RANDOM":
      return handlers.draftRandom(state);
    case "RESET_AUTO_DRAFT":
      return handlers.resetAutoDraft(state);
    case "NEXT_TEAM":
      return handlers.nextTeam(state);
    default:
      return state;
  }
};

