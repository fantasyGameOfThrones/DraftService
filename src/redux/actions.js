import Timer from './../services/Timer.js';
import store from './store.js';


export const startDraft = () => {
  store.dispatch({
    type: 'START_DRAFT'
  });
};

export const endDraft = () => {

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

export const startTimer = (viewUpdate, alarm) => {
  store.dispatch({
    type: 'START_TIMER',
    payload: {viewUpdate,alarm}
  });
};

export const stopTimer = () => {
  store.dispatch({
    type: 'STOP_TIMER'
  });
};
