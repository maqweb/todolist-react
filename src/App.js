import React from 'react';
import './App.css';
import Login from "./components/Login/Login";
import {NavLink, Route} from "react-router-dom";
import Main from "./components/Main/Main";
import {connect} from "react-redux";
import {authMe, logout} from "./store/auth-reducer";

class App extends React.Component {

    componentDidMount() {
        this.props.authMe()
    }

    onLogout = () => {
        this.props.logout()
    };


    render = () => {

        return (
            <>
                <div>

                    {this.props.isAuth
                        ? <button onClick={this.onLogout}>Logout</button>
                        : <NavLink to="/login">Login</NavLink>
                    }
                    <NavLink to="/main">Todolist</NavLink>

                </div>
                <div className="content">
                    <Route path='/login' component={Login}/>
                    <Route path='/main' component={Main}/>
                </div>
            </>
        );
    }
}

const mstp = (state) => ({
    isAuth: state.auth.isAuth
});

const ConnectedApp = connect(mstp, {authMe, logout})(App);
export default ConnectedApp;