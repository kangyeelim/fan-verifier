import { combineReducers } from 'redux';
import { UPDATE_PROFILE, DELETE_PROFILE } from './actions';

const profileReducer = (state=[], action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      var newState = state.concat(action.payload)
      return newState;
    case DELETE_PROFILE:
      var emptyState = [];
      return emptyState;
    default:
      return state;
  }
}

export const reducer = combineReducers({
  profile: profileReducer,
})
