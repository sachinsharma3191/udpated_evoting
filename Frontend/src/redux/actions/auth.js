import axios from "axios";
import _ from 'underscore';
import * as actionTypes from "./actionTypes";

/*function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}*/

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 10000000000);
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://localhost:3002/login', 
            {
                username: email,
                password: password
            })
            .then(response => {
                const responseData = response.data;
                let expirationDate = new Date();
                expirationDate.setMonth(expirationDate.getMonth() + 3);

                localStorage.setItem("token", "sadasdasasdasdasd");
                localStorage.setItem("expirationDate", expirationDate);
                localStorage.setItem("userid", responseData.userid);
                localStorage.setItem("username",responseData.username);
                //Dispatch Actions
                dispatch(authSuccess("asdassa", responseData.username));
                //dispatch(checkAuthTimeout(expirationDate));
            })
            .catch(err => {
                dispatch(authFail(err.response.data));
            }); 
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            const loginDate = new Date();
            if (loginDate >= expirationDate) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem("userId");
                if(!_.isUndefined(userId)){
                    dispatch(logout());
                }
                dispatch(authSuccess(token, userId));
                //dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};