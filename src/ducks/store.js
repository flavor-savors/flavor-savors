import {createStore, applyMiddleware, combineReducers} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import reducer from './reducer';
import useReducer from './userReducer';

const reducers = combineReducers({reducer, useReducer});


export default createStore(reducers, applyMiddleware(promiseMiddleware));