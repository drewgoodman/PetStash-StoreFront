import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';

class NavBar extends Component {
  constructor(props) {
      super(props)

      this.state = {
          
      }
  }

  render() {
      return (
          <div className="navbar">
              <Link to="/shop/all">All Products</Link>
              {
                  this.props.categories.map(category => {
                      return (
                          <Link key={category.id} to={`/shop/${category.route}`}>{category.name}</Link>
                      )
                  })
                }
          </div>
      )
  }
}

export default withRouter(NavBar);