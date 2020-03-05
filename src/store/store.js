import {applyMiddleware, combineReducers, createStore} from "redux";
import reducer from "./reducer";
import thunkMiddleware from 'redux-thunk'
import authReducer from "./auth-reducer";

const reducers = combineReducers({
    auth: authReducer,
    main: reducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
export default store;