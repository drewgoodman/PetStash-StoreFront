import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class SearchBar extends Component {
  constructor(props) {
      super(props)

      this.state = {
          
      }
  }

  render() {
      return (
          <form>
              <div className="header__searchbar__grid">
                  <FontAwesomeIcon className="header__searchbar__icon" icon="search" />
                  <input className="header__searchbar__input" type="text" placeholder="Search" />
              </div>
          </form>
      )
  }
}