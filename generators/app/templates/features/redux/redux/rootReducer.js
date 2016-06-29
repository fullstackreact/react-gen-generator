import { combineReducers } from 'redux';
import { routerReducer as routing, push } from 'react-router-redux';

// Require your modules here
const modules = {
}
export let actions = {
  routing: {
    navigateTo: path => dispatch => dispatch(push(path))
  }
}

export let initialState = {}
export let reducers = {routing};

Object.keys(modules).forEach(key => {
  const module = modules[key];
  initialState[key] = module.initialState || {};
  actions[key] = module.actions;
  reducers[key] = module.reducer;
});

export const rootReducer = combineReducers(reducers);
