import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';

import allIcon from "../../../static/assets/images/icon/all.png"

import storeBanner from "../../../static/assets/images/banners/banner-new.jpg"

import allBanner from "../../../static/assets/images/banners/banner1.jpg"

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className="home">
                <div
                    className="home__main-banner"
                    style={{
                        background: "url(" + storeBanner + ") no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }} />
                <h1>PetStash Supply Co.</h1>
                <hr />
                <h2>SHOP BY CATEGORY</h2>
                <div className="home__categories">
                    <div
                        className="home__category-banner"
                        data-aos="fade-left"
                        style={{
                            background: "url(" + allBanner + ") no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center"

                        }}>
                        <div className="home__category-banner__caption"><p>Not sure where to start?</p></div>
                        <Link to={`/shop/all`} className="home__category-banner__button">
                            SHOP ALL PRODUCTS
                            </Link>
                    </div>

                    {
                        this.props.categories.map(category => {
                            const banner_path = require.context('../../../static/assets/images', true);
                            let banner_url = banner_path('./' + category.banner_url);
                            return (
                                <div
                                    key={category.id}
                                    className="home__category-banner"
                                    data-aos="fade-left"
                                    style={{
                                        background: "url(" + banner_url + ") no-repeat",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center"

                                    }}>
                                    <div className="home__category-banner__caption"><p>{category.banner_caption}</p></div>
                                    <Link to={`/shop/${category.route}`} className="home__category-banner__button">
                                        {category.banner_button}
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}


export default withRouter(Home);