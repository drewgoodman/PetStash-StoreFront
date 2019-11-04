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
          <div>
              <h1>Login</h1>
              <LoginForm />
          </div>
      )
  }
}