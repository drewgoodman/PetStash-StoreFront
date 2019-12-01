import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import SocialLinks from './socialLinks';

export default class Footer extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    onLinkClick() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div className="footer">
                <div className="footer__columns">
                    <SocialLinks />
                    <div className="footer__links">
                        <div className="footer__heading">Quick Links</div>
                        <div className="footer__links-list">
                            <NavLink onClick={() => onLinkClick} className="footer__link" to="/">Go to Home Page</NavLink>
                            <NavLink onClick={() => onLinkClick} className="footer__link" to="/shop/all">Shop All Products</NavLink>
                            <NavLink onClick={() => onLinkClick}  className="footer__link" to="/faq">Frequently Asked Questions</NavLink>
                            {
                                this.props.loggedInStatus === "LOGGED_IN" ? (
                                    <NavLink onClick={() => onLinkClick} className="footer__link" to="/account">View Account Details</NavLink>

                                ) : (
                                    <NavLink onClick={() => onLinkClick} className="footer__link" to="/register">Create an Account</NavLink>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="footer__copyright">
                    <p>&copy; 2019 Drew Goodman &#124; All rights reserved</p>
                </div>
            </div>
        )
    }
}