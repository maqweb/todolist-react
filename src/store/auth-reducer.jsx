import {api} from "../api/api";

const LOGIN = 'LOGIN';
const AUTH_ME = 'AUTH_ME';

const initialState = {
    email: '',
    password: '',
    rememberMe: false,
    isAuth: false
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case AUTH_ME:
            return {
                ...state,
                isAuth: action.value
            };
        case LOGIN:
            return {
                ...state,
                email: action.data.email,
                password: action.data.password,
                rememberMe: action.data.rememberMe,
                isAuth: action.isAuth
            };

        default:
            return state;
    }
};

export const setLogin = (data, isAuth) => ({type: LOGIN, data, isAuth});
export const setAuthMe = (value) => ({type: AUTH_ME, value});

export const authMe = () => (dispatch) => {
    api.authMe()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAuthMe(true));
            } else {
                dispatch(setAuthMe(false));
            }
        })
};

export const login = (email, password, rememberMe) => (dispatch) => {
    api.login(email, password, rememberMe)
        .then(res => {
            if (res.status === 200) {
                dispatch(setLogin(res.data, true));
            }
        })
};

export const logout = () => (dispatch) => {
    api.logout()
        .then(res => {
            if (res.status === 200) {
                dispatch(setLogin(res.data, false));
            }
        })
};


export default authReducer;
