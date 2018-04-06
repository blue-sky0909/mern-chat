/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import { routerReducer } from 'react-router-redux';
import app from './modules/App/AppReducer';
import intl from './modules/Intl/IntlReducer';
import loginReducer from './modules/Login/LoginReducer';
import registerReducer from './modules/Register/RegisterReducer';
import dashboardReducer from './modules/Dashboard/DashboardReducer';
import WorkspaceReducer from './modules/Workspace/WorkspaceReducer';
// Combine all reducers into one root reducer
export default combineReducers({
  app,
  intl,
  routing: routerReducer,
  login: loginReducer,
  register: registerReducer,
  dashboard: dashboardReducer,
  workspace: WorkspaceReducer
});
