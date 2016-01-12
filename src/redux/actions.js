import Timer from './../services/Timer.js';
import store from './store.js';


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
