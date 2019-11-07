import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';


import allIcon from "../../../static/assets/images/icon/all.png"

class NavBar extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }

        this.reloadPage = this.reloadPage.bind(this);
    }

    // Didn't want to use this, but otherwise the shop category component will not refresh, not enought time to fix by refactoring
    reloadPage() {
        window.location.reload();
    }

    render() {
        return (
            <div className="navbar">
                <NavLink onClick={()=> this.reloadPage} className="navbar__navlink" to="/shop/all" activeClassName="navbar__active">
                    <div className="navbar__navlink__icon">
                        <img src={allIcon} />
                    </div>
                    <div>
                        All Products
                    </div>
                </NavLink>
                {
                    this.props.categories.map(category => {
                        const icon_path = require.context('../../../static/assets/images', true);
                        let icon_url = icon_path('./' + category.icon_url);
                        return (
                            <NavLink onClick={()=> reloadPage}  key={category.id} className="navbar__navlink" activeClassName="navbar__active" to={`/shop/${category.route}`}>
                                <div className="navbar__navlink__icon">
                                    <img src={icon_url} />
                                </div>
                                <div>
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