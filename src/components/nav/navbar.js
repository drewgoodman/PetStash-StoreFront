import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
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
              <a href="#">All Products</a>
              {
                  this.props.categories.map(category => {
                      return (
                        <a key={category.id} href="#">{category.name}</a>
                      )
                  })
                }
          </div>
      )
  }
}

export default withRouter(NavBar);