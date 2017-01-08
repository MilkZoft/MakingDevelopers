// Actions Types
import * as types from '../../actions/actionTypes';

// Api
import blogApi from './api';

export function loadPosts(language) {
  return {
    type: types.BLOG_LIST_POSTS,
    payload: blogApi.getAllPosts(language)
  };
}

export function loadSinglePost(day, month, year, slug, language) {
  return {
    type: types.BLOG_SHOW_SINGLE_POST,
    payload: blogApi.getSinglePost(day, month, year, slug, language)
  };
}
