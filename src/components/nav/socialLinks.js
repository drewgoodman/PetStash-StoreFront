


import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class SocialLinks extends Component {
  constructor(props) {
      super(props)
  }

  render() {
    const className = this.props.className? this.props.className : '';
      return (
        <div className={`footer__social ${className}`}>
            <div className="footer__heading">Follow Us</div>
            <div className="footer__icons">
                <FontAwesomeIcon className="footer__icon" icon={['fab', 'facebook-square']} fixedWidth />
                <FontAwesomeIcon className="footer__icon" icon={['fab', 'instagram']} fixedWidth />
                <FontAwesomeIcon className="footer__icon" icon={['fab', 'twitter-square']} fixedWidth />
                <FontAwesomeIcon className="footer__icon" icon={['fab', 'pinterest-square']} fixedWidth />
            </div>
        </div>
      )
  }
}
