import axios from 'axios';
import { withRouter } from 'react-router';

import React, { Component } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class LogoutLink extends Component {
  constructor(props) {
      super(props)

      this.state = {
          
      }
      this.handleSignOut = this.handleSignOut.bind(this)
  }

  handleSignOut() {
    axios.get("https://petstash-backoffice.herokuapp.com/store/logout", {withCredentials: true}
    ).then(response => {
        if (response.data.logoutSuccessful) {
            this.props.handleLogout();
            this.props.history.push("/");
            alert("Logout successful.")
        }
        return response.data
    }).catch(error => {
        console.log("An error occured attempting to log out: ", error)
    })
}

  render() {
      return (
          <a className="header__link" onClick={this.handleSignOut}>
            <FontAwesomeIcon className="header__link-icon" icon="sign-out-alt" />
              <div className="header__link-text">LOGOUT</div>
          </a>
      )
  }
}


export default withRouter(LogoutLink);