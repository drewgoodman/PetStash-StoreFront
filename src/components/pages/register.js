import React, { Component } from 'react';

import RegisterForm from '../auth/registerForm';

export default class Register extends Component {
  constructor(props) {
      super(props)

      this.state = {
          
      }
  }

  render() {
      return (
          <div>
              <h1>User Registration</h1>
              <RegisterForm />
          </div>
      )
  }
}