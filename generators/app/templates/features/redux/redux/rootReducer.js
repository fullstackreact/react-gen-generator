import { combineReducers } from 'redux';
import { routerReducer as routing, push } from 'react-router-redux';

export const actions = {
  routing: {
    navigateTo: path => dispatch => dispatch(push(path))
  }
}

export const rootReducer = combineReducers({
  routing
});
