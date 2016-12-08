// Dependencies
// import { Record } from 'immutable';

// Model
// import RecordModel from './record';

const initialState = {
  information: false,
  posts: false
};

export default function blogReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_POSTS_SUCCESS': {
      const response = action.payload;

      const newState = Object.assign({}, state);

      newState.information = response.information;
      newState.posts = response.response;

      return newState;
    }

    default:
      // Do nothing
  }

  return state;
}
