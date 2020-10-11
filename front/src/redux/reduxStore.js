import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import votesReducer from './reducer/numberReducer';

const reducers = combineReducers({
    vote: votesReducer,
    form: formReducer
});

export const store = createStore(reducers, compose(applyMiddleware(thunk)));