import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';

import allIcon from "../../../static/assets/images/icon/all.png";
import brandIcon from "../../../static/assets/images/icon/store.png";
import storeBanner from "../../../static/assets/images/banners/banner-new.jpg";
import allBanner from "../../../static/assets/images/banners/banner1.jpg";
import orderImage from "../../../static/assets/images/info/order.jpg";
import deliverImage from "../../../static/assets/images/info/delivery.jpg";
import enjoyImage from "../../../static/assets/images/info/enjoy2.jpg";

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className="home">
                <div className="page__space30 media-disable" />
                <div
                    className="home__main-banner"
                    style={{
                        background: "url(" + storeBanner + ") no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}>
                    {/* <img src={brandIcon} className="home__main-banner__icon" /> */}
                    <div className = "home__main-banner__brand-contrast" />
                    <div className="home__main-banner__brand">
                        PetStash Supply Co.
                    </div>
                </div>
                <div className="page__space30" />
                <div className="home__heading">FOR ALL YOUR PET NEEDS</div>
                <div className="home__overview-columns">
                    <div className="home__overview-column" data-aos="fade-up">
                        <img src={orderImage} className="home__overview-image" />
                        <div className="home__overview-text">
                            Order anytime, anywhere, at YOUR convenience.
                        </div>
                    </div>
                    <div className="home__overview-column" data-aos="fade-up">
                        <img src={deliverImage} className="home__overview-image" />
                        <div className="home__overview-text">
                            Enjoy low cost shipping and deliveries in under 3 days.
                        </div>
                    </div>
                    <div className="home__overview-column" data-aos="fade-up">
                        <img src={enjoyImage} className="home__overview-image" />
                        <div className="home__overview-text">
                            Treat your friends to the quality they deserve.
                        </div>
                    </div>
                </div>
                <div className="home__heading">SHOP BY CATEGORY</div>
                <div className="home__categories">
                    <div
                        className="home__category-banner"
                        data-aos="fade-left"
                        style={{
                            background: "url(" + allBanner + ") no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center"

                        }}>
                        <div className="home__category-banner__contrast media-disable" />
                        <div className="home__category-banner__caption"><p>Not sure where to start?</p></div>
                        <Link to={`/shop/all`} className="home__category-banner__button">
                            Shop All Products
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
                                    <div className="home__category-banner__contrast media-disable" />
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