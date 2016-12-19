// Dependencies
import { combineReducers } from 'redux';

// Components Reducers
import blog from '../containers/Blog/reducer';

// Shared Reducers
import content from './contentReducer';
import device from './deviceReducer';
import language from './languageReducer';

const rootReducer = combineReducers({
  blog,
  content,
  device,
  language
});

export default rootReducer;
