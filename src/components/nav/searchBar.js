import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from 'react-router';

class SearchBar extends Component {
  constructor(props) {
      super(props)

      this.submitSearchQuery = this.submitSearchQuery.bind(this);
  }

  submitSearchQuery() {
    event.preventDefault();
    const searchInput = document.getElementById("SearchBarInput")
    if(searchInput.value !== "") {
        let newQuery = searchInput.value;
        this.props.handleSearchQuery(newQuery);
        searchInput.value = "";
        this.props.history.push("/shop/search");
    }
  }

  render() {
      return (
          <form onSubmit={this.submitSearchQuery}>
              <div className="header__searchbar__grid">
                  <FontAwesomeIcon onClick={this.submitSearchQuery} className="header__searchbar__icon" icon="search" />
                  <input id="SearchBarInput" className="header__searchbar__input" type="text" placeholder="Search" />
              </div>
          </form>
      )
  }
}

export default withRouter(SearchBar);