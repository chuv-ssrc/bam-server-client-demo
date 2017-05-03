import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import authReducers from '../actions/reducers/authReducers';


const logger = createLogger({
  collapsed: true,
  //diff: false,
});


const store = createStore(combineReducers({
  auth: authReducers,
}), applyMiddleware(logger));



export default store;

