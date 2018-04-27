import React, { Component } from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import '../styles/Login.css';


class Login extends Component {
constructor() {
    super();
    this.state = {
        email: '',
        password: '',
        isLoggedIn: false
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}


handleEmailChange(event) {
    this.setState({email: event.target.value});
}

handlePasswordChange(event) {
    this.setState({password: event.target.value});
}

handleSubmit(event) {
    event.preventDefault();
    let {email, password} = this.state;
    fetch("/login", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        // This is the body parameter
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(res => {
        if(res.status === 200) {
            this.setState({isLoggedIn: true});        
            this.props.onAuthChange(true);
        }
    })
    .catch(err => {
    console.log(err.message);
    });
}


    render() {
        let isLoggedIn = this.state.isLoggedIn;

        if(isLoggedIn) {
            return(<Redirect to="/" />);
        }

        return (
            <div className="containerLogIn"> 
                <form onSubmit={this.handleSubmit} className="jumbotron jumbotron-fluid m-0" id="login-form" noValidate>
                    <div className="container" id="login-form-content">
                        <h1 className="text-white text-center">Sign in</h1>
                        <div className="row">
                            <input 
                                className="form-control col-12 mb-3" 
                                id="email-login" 
                                type="email" 
                                placeholder="Email" 
                                value={this.state.email} 
                                onChange={this.handleEmailChange} 
                                required/>
                            <input 
                                className="form-control col-12 mb-3" 
                                id="password-login" 
                                type="password" 
                                placeholder="Password" 
                                value={this.state.password} 
                                onChange={this.handlePasswordChange} 
                                required/>
                            <button type="submit" className="btn btn-success col-4 mb-3 mx-auto">Login</button>
                            <span className="col-12 text-white text-center">Don't have an account? <a href="/register">Register</a></span>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;