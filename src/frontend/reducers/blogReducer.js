// import PostRecord from '../models/PostRecord';
import { Record } from 'immutable';

const RecordState = Record({
  posts: []
});

const initialState = new RecordState;

export default function blogReducer(state = initialState, action) {
  if (!(state instanceof RecordState)) {
    return new RecordState(state);
  }

  switch (action.type) {
    case 'BLOG_LIST_POSTS_SUCCESS': {
      const response = action.payload ? action.payload.response : [];

      return state.set('posts', response);
    }

    default:
      return state;
  }
}
