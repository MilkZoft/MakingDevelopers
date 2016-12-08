// Dependencies
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

// Global Reducers
import config from '../reducers/ConfigReducer';
import device from '../reducers/DeviceReducer';
import language from '../reducers/LanguageReducer';

// Components Reducers
import blog from '../components/Blog/Reducer';

const AppReducer = combineReducers({
  // Global
  config,
  device,
  language,
  routing,

  // Components
  blog
});

export default AppReducer;
