import {createStore} from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState().get('draftStatus'),store.getState().get('teams'));
});

export default store;