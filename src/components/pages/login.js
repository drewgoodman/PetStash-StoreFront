import React, { Component } from 'react';

import LoginForm from '../auth/loginForm';

export default class Login extends Component {
  constructor(props) {
      super(props)

      this.state = {
          
      }
  }

  render() {
      return (
          <div className="page-content">
              <h1>Login</h1>
              <LoginForm handleSuccessfulLogin={this.props.handleSuccessfulLogin} />
          </div>
      )
  }
}