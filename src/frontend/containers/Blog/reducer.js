import PostRecord from './model';
import { Record } from 'immutable';

const InitialState = Record({
  list: []
});

const initialState = new InitialState;

const jsonToList = list => list && list
  .map(json => new PostRecord(json));

const revive = ({ list }) => initialState.merge({
  list: jsonToList(list)
});

export default function blogReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) {
    return revive(state);
  }

  switch (action.type) {
    case 'BLOG_LIST_POSTS_SUCCESS': {
      const response = action.payload ? action.payload.response : [];

      const newList = jsonToList(response);

      return state.set('list', newList);
    }

    case 'BLOG_SHOW_SINGLE_POST_SUCCESS': {
      const response = action.payload ? action.payload.response : [];

      const newList = jsonToList(response);

      return state.set('list', newList);
    }

    default:
      return state;
  }
}
