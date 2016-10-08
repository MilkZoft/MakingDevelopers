import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import ConfigReducer from '../reducers/ConfigReducer';

const AppReducer = combineReducers({
  ConfigReducer,
  routing
});

export default AppReducer;
