// Dependencies
import { combineReducers } from 'redux';

// Reducers
import blog from './blogReducer';
import content from './contentReducer';

const rootReducer = combineReducers({
  blog,
  content
});

export default rootReducer;
