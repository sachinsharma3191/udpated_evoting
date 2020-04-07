import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../../util/utility";

const initialState = {
    candidates: [],
    error: null,
    loading: true,
};

const fetchCandidateStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const fetchCandidateSuccess = (state, action) => {
    return updateObject(state, {
        candidates: action.candidates,
        loading: false,
    });
};

const fetchCandidateFailure = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const fetchCandidateImageStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const fetchCandidateImageSuccess = (state, action) => {
    return updateObject(state, {
        candidates: action.candidates,
        loading: false
    });
};

const fetchCandidateImageFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CANDIDATES_START:
            return fetchCandidateStart(state, action);
        case actionTypes.FETCH_CANDIDATES_SUCCESS:
            return fetchCandidateSuccess(state, action);
        case actionTypes.FETCH_CANDIDATES_FAIL:
            return fetchCandidateFailure(state, action);
        case actionTypes.FETCH_CANDIDATE_IMAGE_START:
            return fetchCandidateImageStart(state, action);
        case actionTypes.FETCH_CANDIDATE_IMAGE_SUCCESS:
            return fetchCandidateImageSuccess(state, action);
        case actionTypes.FETCH_CANDIDATE_IMAGE_FAIL:
            return fetchCandidateImageFail(state, action);
        default:
            return state;
    }
};

export default reducer;