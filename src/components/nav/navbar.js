import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';


import allIcon from "../../../static/assets/images/icon/all.png"

class NavBar extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }

    }

    // TODO: Add in Navbar versions of login links

    render() {
        return (
            <div className="navbar navbar__dropdown-off">
                {
                    this.props.loggedInStatus === "LOGGED_IN" ? (
                        null
                    ) : (
                        null
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