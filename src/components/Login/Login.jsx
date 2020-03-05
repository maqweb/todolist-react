import React from 'react';
import './../../App.css'
import {connect} from "react-redux";
import {login} from "../../store/auth-reducer";
import {Redirect} from "react-router-dom";

class Login extends React.Component {

    state = {
        email: '',
        password: '',
        rememberMe: false
    };

    onChangeEmail = (e) => {
        this.setState({
            email: e.currentTarget.value
        })
    };

    onChangePassword = (e) => {
        this.setState({
            password: e.currentTarget.value
        })
    };

    onRememberMe = (e) => {
        this.setState({
            rememberMe: e.currentTarget.checked
        })
    };

    onSendData = (e) => {
        e.preventDefault();
        this.props.login(this.state.email, this.state.password, this.state.rememberMe)
    };


    render() {

        if (this.props.isAuth) {
            return <Redirect to='/main'/>
        }

        return (
            <div>
                <div>
                    <p>test account: free@samuraijs.com</p>
                    <p>password: free</p>
                </div>
                <form className='form'>
                    <input value={this.state.email}
                           placeholder={'email'}
                           onChange={this.onChangeEmail}
                           type="text"/>

                    <input value={this.state.password}
                           placeholder={'password'}
                           onChange={this.onChangePassword}
                           type="password"/>
                    <div>
                        <label>
                            <input onChange={this.onRememberMe}
                                   checked={this.state.rememberMe} type="checkbox"/>Remember me
                        </label>
                        <button onClick={this.onSendData}>Login</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mstp = (state) => ({
    email: state.auth.email,
    password: state.auth.password,
    rememberMe: state.auth.rememberMe,
    isAuth: state.auth.isAuth
});

const ConnectedLogin = connect(mstp, {login})(Login);
export default ConnectedLogin;
