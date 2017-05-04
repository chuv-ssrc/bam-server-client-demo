import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import authReducers from '../actions/reducers/authReducers';
import feedbackReducers from '../actions/reducers/feedbackReducers';

const logger = createLogger({
  collapsed: true,
  //diff: false,
});


const store = createStore(combineReducers({
    auth: authReducers,
    feedback: feedbackReducers,
  }),
  applyMiddleware(logger)
);



export default store;

