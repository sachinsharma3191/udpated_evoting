import {
    combineReducers
} from 'redux';
import * as actionTypes from '../redux/actions/actionTypes';
import AuthReducer from './reducers/auth';
import CandidateReducer from './reducers/candidate';

const appReducer = combineReducers({
    auth: AuthReducer,
    candidate: CandidateReducer
});


export default (state, action) => {
    if (action.type === actionTypes.AUTH_LOGOUT) {
        state = undefined;
    }

    return appReducer(state, action);
};