import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';

import allIcon from "../../../static/assets/images/icon/all.png"

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <h1>PetStash Supply Co.</h1>
                <hr />
                <h2>SHOP BY CATEGORY</h2>
                <div className="categories">
                    <Link to={`/shop/all`}>
                        <img src={allIcon} data-aos="fade-up" />
                    </Link>
                    {
                        this.props.categories.map(category => {
                            const icon_path = require.context('../../../static/assets/images', true);
                            let icon_url = icon_path('./' + category.icon_url);
                            return (
                                <Link key={category.id} to={`/shop/${category.route}`}>
                                    <img src={icon_url} data-aos="fade-up" />
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}


export default withRouter(Home);