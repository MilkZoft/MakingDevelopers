// Dependencies
import { combineReducers } from 'redux';

// Components Reducers
import blog from '../containers/Blog/reducer';

// Shared Reducers
import content from './contentReducer';

const rootReducer = combineReducers({
  blog,
  content
});

export default rootReducer;
