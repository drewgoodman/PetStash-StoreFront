import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';


import ShopProduct from '../shop/shopProduct';
import Loader from "../loader";


class ShopCategory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentCategory: this.props.match.params.slug,
            products: [],
            isLoading: true,
            categoryHeading: "Retrieving products...",
            currentSearchQuery: ""
        }

        this.getCategoryProducts = this.getCategoryProducts.bind(this);
        this.fillProducts = this.fillProducts.bind(this);
    }

    getCategoryProducts() {
        this.setState({
            currentCategory: this.props.match.params.slug,
            currentSearchQuery: this.props.searchQuery
        });

        let route = this.props.match.params.slug === "all" || this.props.match.params.slug === "search" ? "" : `/${this.props.match.params.slug}`
        if (this.props.loggedInStatus === "LOGGED_IN") {
            axios.get(
                `https://petstash-backoffice.herokuapp.com/store/get-products/user${route}`,
                { withCredentials: true }
            ).then(response => {
                this.fillProducts(response.data);
            }).catch(error => {
                console.log("An error occured retrieving category products", error);
                this.props.history.push("/nomatch");
            });
        } else {
            axios.get(
                `https://petstash-backoffice.herokuapp.com/store/get-products${route}`
            ).then(response => {
                this.fillProducts(response.data);
            }).catch(error => {
                console.log("An error occured retrieving category products", error);
                this.props.history.push("/nomatch");
            });
        }
    }

    fillProducts(productData) {
        this.setState({
            isLoading: false
        })
        if (this.state.currentCategory === "search" && this.state.currentSearchQuery !== "") {
            console.log("Time to look!",this.props.searchQuery);
            // TODO: Filter products here based on search function
        } else {
            this.setState({
                products: productData,
                categoryHeading: this.props.match.params.slug === "all" || this.props.match.params.slug === "search" ? "Shop all products" : `Shop ${this.props.match.params.slug} products.`
            })
        }
    }


    componentDidMount() {
        this.getCategoryProducts();
        window.scrollTo(0, 0);
    }

    componentDidUpdate() {
        if (this.props.match.params.slug !== this.state.currentCategory || (this.state.currentCategory === "search" && this.state.currentSearchQuery !== this.props.searchQuery)) {
            this.setState({isLoading:true});
            this.getCategoryProducts();
            window.scrollTo(0, 0);
        }
    }


    render() {
        return (
            <div className="page-content">
                <Loader isLoading={this.state.isLoading}/>
                <div className="page__heading">{this.state.categoryHeading} ({this.state.products.length} results found):</div>
                <div className="page__space30" />
                <div className="shop__grid">
                {
                    this.state.products.map(product => {
                        return (
                            <ShopProduct key={product.id} product={product} loggedInStatus={this.props.loggedInStatus}  />
                        )
                    })
                }

                </div>
            </div>
        )
    }
}

export default withRouter(ShopCategory);