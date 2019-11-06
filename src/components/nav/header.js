import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LogoutLink from '../auth/logoutLink'

import storeIcon from "../../../static/assets/images/icon/store.png"
import storeBanner from "../../../static/assets/images/banners/banner-new.jpg"

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
                    style={{
                        background: "url(" + storeBanner + ") no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                >

                    <div className="header__name">PetStash Supply Co.</div>
                    <div className="header__tagline"></div>
                </div>
                <div className="header__right">
                    <NavLink to="/" activeClassName="header-link-active">
                        Home
                    </NavLink>

                    {this.props.loggedInStatus === "LOGGED_IN" ? (
                        <div>
                            <div> 
                                <LogoutLink handleLogout={this.props.handleLogout} />
                            </div>
                            <div>
                                <div>
                                    <FontAwesomeIcon icon="user-cog" />
                                    <NavLink to="/account" activeClassName="header-link-active">
                                        Your Account
                                    </NavLink>
                                </div>
                                {this.props.cartModalEnabled ? (
                                    <div>
                                        <FontAwesomeIcon icon="shopping-cart" />
                                        <a onClick={this.props.openCartModal}>Your Cart</a>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ) : (
                            <div>
                                <div>
                                    <FontAwesomeIcon icon="user-cog" />
                                    <NavLink to="/register" activeClassName="header-link-active">
                                        Register
                                    </NavLink>
                                </div>
                                <div>
                                    <FontAwesomeIcon icon="sign-in-alt" />
                                    <NavLink to="/login" activeClassName="header-link-active">
                                        Login
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