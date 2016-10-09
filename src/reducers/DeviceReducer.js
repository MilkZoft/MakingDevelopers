// Dependencies
import { Record } from 'immutable';

// Actioms
import * as actions from '../actions/DeviceActions';

const InitialState = Record({
  isMobile: false,
  platform: '',
  host: '',
  isBrowser: false,
  agent: {}
});

const initialState = new InitialState;

export default function deviceReducer(state = initialState, action) {
  if (!state instanceof InitialState) {
    return initialState.merge(state);
  }

  switch (action.type) {
    case actions.SET_PLATFORM: {
      const { platform } = action.payload;
      return state.set('platform', platform);
    }
    default:
  }

  return state;
}
