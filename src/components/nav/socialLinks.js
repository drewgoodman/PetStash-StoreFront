import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function () {
    return (
        <div className="footer__social">
            <div className="footer__heading">Follow Us</div>
            <div className="footer__icons">
                <FontAwesomeIcon className="footer__icon" icon={['fab', 'facebook-square']} fixedWidth />
                <FontAwesomeIcon className="footer__icon" icon={['fab', 'instagram']} fixedWidth />
                <FontAwesomeIcon className="footer__icon" icon={['fab', 'twitter-square']} fixedWidth />
                <FontAwesomeIcon className="footer__icon" icon={['fab', 'pinterest-square']} fixedWidth />
            </div>
        </div>
    )
};