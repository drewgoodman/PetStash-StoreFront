import React, { Component } from 'react';

import RegisterForm from '../auth/registerForm';

export default class Register extends Component {
  constructor(props) {
      super(props)
  }

  render() {
      return (
          <div className="page-content">
              <div className="page__heading">Register Account</div>
              <RegisterForm />
          </div>
      )
  }
}