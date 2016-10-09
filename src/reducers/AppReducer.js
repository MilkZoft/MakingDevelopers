// Dependencies
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

// Reducers
import config from '../reducers/ConfigReducer';
import device from '../reducers/DeviceReducer';
import language from '../reducers/LanguageReducer';

const AppReducer = combineReducers({
  config,
  device,
  language,
  routing
});

export default AppReducer;
