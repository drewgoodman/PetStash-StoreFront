import axios from 'axios';
import { withRouter } from 'react-router';

import React, { Component } from 'react';

import Loader from "../loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class LogoutLink extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false
        }
        this.handleSignOut = this.handleSignOut.bind(this)
    }

    handleSignOut() {
        this.setState({isLoading: true});
        axios.get("https://petstash-backoffice.herokuapp.com/store/logout", { withCredentials: true }
        ).then(response => {
            this.setState({isLoading: false});
            if (response.data.logoutSuccessful) {
                this.props.handleLogout();
                this.props.history.push("/login");
            }
            return response.data
        }).catch(error => {
            this.setState({isLoading: false});
            console.log("An error occured attempting to log out: ", error)
        })
    }

    render() {
        return (
            <div>
                <Loader isLoading={this.state.isLoading} />
                <a className="header__link" onClick={this.handleSignOut}>
                    <FontAwesomeIcon className="header__link-icon" icon="sign-out-alt" />
                    <div className="header__link-text">LOGOUT</div>
                </a>

            </div>
        )
    }
}


export default withRouter(LogoutLink);