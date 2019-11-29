import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import LogoutLink from '../auth/logoutLink';
import allIcon from "../../../static/assets/images/icon/all.png"

class NavBar extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }

    }

    componentDidUpdate(newProps) {
        if (this.props.location.pathname !== newProps.location.pathname) {
            this.props.disableNavbar();
        }
    }

    render() {
        return (
            <div id="navbar" className="navbar navbar__dropdown-off">
            {
                this.props.loggedInStatus === "LOGGED_IN" ? (
                    <NavLink className="navbar__navlink media-enable" to="/account" activeClassName="navbar__active">
                        <div className="navbar__navlink__icon">
                            <FontAwesomeIcon icon="user-cog" />
                        </div>
                        <div className="navbar__navlink__text">
                            View Account
                        </div>
                    </NavLink>
                ) : (
                    <NavLink className="navbar__navlink media-enable" to="/register" activeClassName="navbar__active">
                        <div className="navbar__navlink__icon">
                            <FontAwesomeIcon icon="user-cog" />
                        </div>
                        <div className="navbar__navlink__text">
                            Register
                        </div>
                    </NavLink>
                    )
            }
            {
                this.props.loggedInStatus === "LOGGED_IN" ? (
                    <LogoutLink navbarStyle={true} handleLogout={this.props.handleLogout} />
                ) : (
                    <NavLink className="navbar__navlink media-enable" to="/login" activeClassName="navbar__active">
                        <div className="navbar__navlink__icon">
                            <FontAwesomeIcon icon="sign-in-alt" />
                        </div>
                        <div className="navbar__navlink__text">
                            Sign In
                        </div>
                    </NavLink>
                    )
            }
                <NavLink className="navbar__navlink" to="/shop/all" activeClassName="navbar__active">
                    <div className="navbar__navlink__icon">
                        <img src={allIcon} />
                    </div>
                    <div className="navbar__navlink__text">
                        All Products
                    </div>
                </NavLink>
                {
                    this.props.categories.map(category => {
                        const icon_path = require.context('../../../static/assets/images', true);
                        let icon_url = icon_path('./' + category.icon_url);
                        return (
                            <NavLink key={category.id} className="navbar__navlink" activeClassName="navbar__active" to={`/shop/${category.route}`}>
                                <div className="navbar__navlink__icon">
                                    <img src={icon_url} />
                                </div>
                                <div className="navbar__navlink__text">
                                    {category.name}
                                </div>
                            </NavLink>
                        )
                    })
                }
            </div>
        )
    }
}

export default withRouter(NavBar);