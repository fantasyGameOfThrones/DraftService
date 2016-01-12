import {createStore} from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

store.subscribe(() => {
  let state = store.getState();
  console.log(state.get('teams'));
  // console.log(state.get('currentTeamIndex'));
  // console.log(state.get('currentTeamId'));
  // console.log(state.get('draftStatus'));
});

export default store;