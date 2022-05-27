import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { createLogger } from 'redux-logger';
import userReducer from './page-admin/userReducer';
import { AppActions } from './Actiontype';
import adminReducer from './page-admin/adminReducer';

const logger = createLogger();
export const rootReducer = combineReducers({ userReducer, adminReducer });
export type AppState = ReturnType<typeof rootReducer>;
export const store = createStore<AppState, AppActions, {}, {}> (
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<AppActions>,
  logger
));
