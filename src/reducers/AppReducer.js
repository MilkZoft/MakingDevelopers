import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import config from '../reducers/ConfigReducer';
import device from '../reducers/DeviceReducer';

const AppReducer = combineReducers({
  config,
  device,
  routing
});

export default AppReducer;
