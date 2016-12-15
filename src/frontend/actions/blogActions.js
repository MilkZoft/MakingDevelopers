// Actions Types
import * as types from './actionTypes';

// Api
import blogApi from '../api/blogApi';

export function loadAllPosts() {
  return {
    type: types.BLOG_LIST_POSTS,
    payload: blogApi.getAllPosts()
  };
}
