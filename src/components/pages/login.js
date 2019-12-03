import React, { Component } from 'react';

import LoginForm from '../auth/loginForm';

export default class Login extends Component {
  constructor(props) {
      super(props)

  }

  componentDidMount() {
    window.scrollTo(0, 0);
}

  render() {
      return (
          <div className="page-content">
          <div className="page__heading">Login to Account</div>
              <LoginForm handleSuccessfulLogin={this.props.handleSuccessfulLogin} />
          </div>
      )
  }
}