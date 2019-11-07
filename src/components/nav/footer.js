import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Footer extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className="footer">
                <div className="footer__columns">
                    <div className="footer__social">
                        <div className="footer__heading">Follow Us</div>
                        <div className="footer__icons">
                            <FontAwesomeIcon className="footer__icon" icon={['fab', 'facebook-square']} fixedWidth />
                            <FontAwesomeIcon className="footer__icon" icon={['fab', 'instagram']} fixedWidth />
                            <FontAwesomeIcon className="footer__icon" icon={['fab', 'pinterest-square']} fixedWidth />
                        </div>
                    </div>
                    <div className="footer__links">
                        <div className="footer__heading">Quick Links</div>
                        <div className="footer__links-list">
                            <NavLink className="footer__link" to="/">Go to Home Page</NavLink>
                            <NavLink className="footer__link" to="/shop/all">Shop All Products</NavLink>
                            <NavLink className="footer__link" to="/faq">Frequently Asked Questions</NavLink>
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