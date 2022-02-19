import React, { Component } from "react";
import { Form } from 'react-bootstrap';
import axios from 'axios';

import './styles/index.css'

const api = axios.create({ baseURL: 'http://localhost:3001' });

export default class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      tab: 'login',
      name: '',
      pass: '',
      mail: '',
      isLoggedIn: true,
      validAccount: true,
      validatedInputs: true
    };
  }

  // handle log in state changes and calls to API for authentication
  handleLogin = (event) => {
    event.preventDefault();
    api.post('/api/login', {
      email: this.state.mail,
      password: this.state.pass
    }).then((res) => {
      if (res.data.success) {
        this.setState({
          name: res.data.name,
          tab: 'greet',
          isLoggedIn: true
        });
      }
      else {
        this.setState({
          isLoggedIn: false
        })
      }
    });
  }

  // handle registration state chnages and add user to database via API call to local host
  handleRegister = (event) => {
    event.preventDefault();
    if (this.state.mail !== '' && this.state.name !== '' && this.state.pass !== '') {
      api.post('/api/register', {
        email: this.state.mail,
        name: this.state.name,
        password: this.state.pass
      }).then((res) => {
          this.setState({
            tab: 'login',
          });
        }
      );
    }
    else {
      this.setState({
        validatedInputs: false
      })
    }
  }

  // handles recovery/forgot password state changes
  handleRecovery = (event) => {
    event.preventDefault();
    api.post('/api/forgot', {
      email: this.state.mail
    }).then((res) => {
      if (res.data.success) {
        alert("Recovery Email Sent to " + this.state.mail);
        this.setState({
          tab: 'login',
          mail: '',
          pass: '',
          validAccount: true,
        })
      }
      else {
        this.setState({
          validAccount: false
        })
      }
    });
  }


  // renderer for login component
  renderLogin = () => {

    let {isLoggedIn} = this.state;
    const renderAuthError = () => {
      if (!isLoggedIn) {
        return <h1 className="auth-error">invalid email and password combo</h1>;
      }
    }

    return (
        <>
          <Form id="login" className="form" onSubmit={this.handleLogin}>
            <h1 className="auth-header">Login</h1>
              <Form.Group className="input-group">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                  className="form-input"
                  type="text"
                  name="email"
                  value={this.state.mail}
                  onChange={(event) => { this.setState({ mail: event.target.value }); }}
                  />
              </Form.Group>
              <Form.Group className="input-group">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                  className="form-input"
                  type="password"
                  name="password"
                  value={this.state.pass}
                  onChange={(event) => { this.setState({ pass: event.target.value }); }}
                  />
              </Form.Group>
              {renderAuthError()}
              <Form.Group>
                  <Form.Control
                  className="submit-btn"
                  type="submit"
                  name="Submit"
                  value="Login"
                  >
                  </Form.Control>
              </Form.Group>
              <Form.Group className="alternate-btn register-btn">
                  <Form.Label id="register-label" onClick={(event) => { this.setState({ tab: 'register', mail: '', pass: '' }); }}>
                      Register
                  </Form.Label>
              </Form.Group>
              <Form.Group className="alternate-btn recovery-btn">
                  <Form.Label id="register-label" onClick={(event) => { this.setState({ tab: 'recovery' }); }}>
                      Forgot Password
                  </Form.Label>
              </Form.Group>
          </Form>
        </>
    );
  }

  renderRegister = () => {

    let {validatedInputs} = this.state;
    const renderAuthError = () => {
      if (!validatedInputs) {
        return <h1 className="auth-error">all fields are required</h1>;
      }
    }

    return (
        <>
            <Form id="register" className="form" onSubmit={this.handleRegister}>
              <h1 id="register-header" className="auth-header">Sign Up</h1>
                <Form.Group className="input-group">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                    className="form-input"
                    type="text"
                    name="email"
                    placeholder="jondoe@example.com"
                    value={this.state.mail}
                    onChange={(event) => { this.setState({ mail: event.target.value }); }}
                    />
                </Form.Group>
                <Form.Group className="input-group">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                    className="form-input"
                    type="text"
                    name="name"
                    placeholder="jondoe123"
                    value={this.state.name}
                    onChange={(event) => { this.setState({ name: event.target.value }); }}
                    />
                </Form.Group>
                <Form.Group className="input-group">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    className="form-input"
                    type="password"
                    name="password"
                    value={ this.state.pass }
                    onChange={(event) => { this.setState({ pass: event.target.value }); }}
                    />
                </Form.Group>
                {renderAuthError()}
                <Form.Group className="input-group">
                    <Form.Control
                    className="submit-btn"
                    type="submit"
                    name="Submit"
                    value="Sign Up"
                    />
                </Form.Group>
                <Form.Group id="back-to-login" className="alternate-btn login-btn">
                  <Form.Label id="register-label" onClick={(event) => { this.setState({ tab: 'login' }); }}>
                      Back to Login
                  </Form.Label>
              </Form.Group>
            </Form>
        </>
    );
  }

  renderRecovery = () => {

    let {validAccount} = this.state;
    const renderAuthError = () => {
      if (!validAccount) {
        return <h1 className="auth-error">account does not exist</h1>;
      }
    }
    
    return (
        <>
            <Form id="recovery" className="form" onSubmit={this.handleRecovery}>
              <h1 id="recovery-header" className="auth-header">Recover Password</h1>
                <Form.Group className="input-group">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                    className="form-input"
                    type="text"
                    name="email"
                    value={this.state.mail}
                    onChange={(event) => { this.setState({ mail: event.target.value }); }}
                    />
                </Form.Group>
                {renderAuthError()}
                <Form.Group className="input-group">
                    <Form.Control
                    className="submit-btn"
                    type="submit"
                    name="Submit"
                    value="Send Recovery Email"
                    />
                </Form.Group>
                <Form.Group className="alternate-btn login-btn">
                  <Form.Label id="register-label" onClick={(event) => { this.setState({ tab: 'login' }); }}>
                      Back to Login
                  </Form.Label>
              </Form.Group>
            </Form>
        </>
    );
  }

  renderGreet = () => {
    return (
      <div className="greet-content">
        <Form>
          <Form.Group className="alternate-btn logout-btn">
            <Form.Label id="welcome-label" onClick={(event) => { this.setState({ tab: 'login' }); }}>
              Log Out
            </Form.Label>
          </Form.Group>
        </Form>
        <h1>Welcome to Dorian, <strong>{this.state.name}</strong></h1>
      </div>
    );
  }

  render() {
    switch (this.state.tab) {
      case 'login':
        return this.renderLogin();
      case 'register':
        return this.renderRegister();
      case 'recovery':
        return this.renderRecovery();
      case 'greet':
        return this.renderGreet();
      default:
        return (<></>);
    }
  }
}