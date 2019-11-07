import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LogoutLink from '../auth/logoutLink'

import storeIcon from "../../../static/assets/images/icon/store-alt2.png"

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className="header">
                <div className="header__left">
                    <NavLink to="/">
                    <img className="header__icon" src={storeIcon} />
                    </NavLink>
                </div>
                <div
                    className="header__middle"
                >

                    <div className="header__name">PetStash Supply Co.</div>
                </div>


                <div className="header__right">

                    {this.props.loggedInStatus === "LOGGED_IN" ? (
                        <div className="header__links">
                                <div className="header__link">
                                    <FontAwesomeIcon className="header__link-icon"  icon="user-cog" />
                                    <NavLink to="/account" className="header__link-text" activeClassName="header-link-active">
                                        ACCOUNT
                                    </NavLink>
                                </div>
                                {this.props.cartModalEnabled ? (
                                    <div className="header__link">
                                        <FontAwesomeIcon className="header__link-icon"  icon="shopping-cart" />
                                        <a  className="header__link-text" onClick={this.props.openCartModal}>CART</a>
                                    </div>
                                ) : <div></div>}
                                <div className="header__link"> 
                                    <LogoutLink handleLogout={this.props.handleLogout} />
                                </div>
                            </div>
                    ) : (
                            <div className="header__links">
                                <div></div>
                                <div className="header__link">
                                    <FontAwesomeIcon className="header__link-icon"  icon="user-cog" />
                                    <NavLink className="header__link-text" to="/register" activeClassName="header-link-active">
                                        REGISTER
                                    </NavLink>
                                </div>
                                <div className="header__link">
                                    <FontAwesomeIcon className="header__link-icon"  icon="sign-in-alt" />
                                    <NavLink className="header__link-text" to="/login" activeClassName="header-link-active">
                                        LOGIN
                                    </NavLink>
                                </div>
                            </div>

                        )}
                </div>
            </div>
        )
    }
}


export default withRouter(Header);