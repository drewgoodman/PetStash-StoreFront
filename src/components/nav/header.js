import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

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
                    <img className="header__icon" src={storeIcon} />

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

                    {this.props.loggedInStatus === "LOGGED_IN" ? (
                        <div>
                            <LogoutLink handleLogout={this.props.handleLogout} />
                            <div>
                                <div>
                                    <NavLink to="/account" activeClassName="header-link-active">
                                        Your Account
                                    </NavLink>
                                </div>
                                {this.props.cartModalEnabled ? <a onClick={this.props.openCartModal}>Your Cart</a> : null }
                            </div>
                        </div>
                    ) : (
                            <div>
                                <div>
                                    <NavLink to="/register" activeClassName="header-link-active">
                                        Register
                                    </NavLink>
                                </div>
                                <div>
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