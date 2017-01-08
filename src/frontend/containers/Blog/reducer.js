import PostRecord from './model';
import { Record } from 'immutable';

const InitialState = Record({
  posts: [],
  post: []
});

const initialState = new InitialState;

const jsonToList = list => list && list.map(json => new PostRecord(json));

const revive = ({ posts, post }) => initialState.merge({
  posts: jsonToList(posts),
  post: new PostRecord(post)
});

export default function blogReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) {
    return revive(state);
  }

  switch (action.type) {
    case 'BLOG_LIST_POSTS_SUCCESS': {
      const response = action.payload ? action.payload.response : [];
      const posts = jsonToList(response);

      return state.set('posts', posts);
    }

    case 'BLOG_SHOW_SINGLE_POST_SUCCESS': {
      const response = action.payload ? action.payload.response : [];
      const post = jsonToList(response);

      return state.set('post', post);
    }

    default:
      return state;
  }
}
