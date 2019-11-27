import React, { Component } from 'react';
import axios from 'axios';

import ShopProduct from '../shop/shopProduct';
import Loader from "../loader";


export default class ShopCategory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentCategory: this.props.match.params.slug,
            products: [],
            isLoading: true
        }

        this.getCategoryProducts = this.getCategoryProducts.bind(this)
    }

    getCategoryProducts() {
        let route = this.props.match.params.slug === "all" ? "" : `/${this.props.match.params.slug}`
        if (this.props.loggedInStatus === "LOGGED_IN") {
            axios.get(
                `https://petstash-backoffice.herokuapp.com/store/get-products/user${route}`,
                { withCredentials: true }
            ).then(response => {
                this.setState({
                    products: response.data,
                    isLoading: false
                })
                console.log(response.data)
            }).catch(error => {
                console.log("An error occured retrieving category products", error);
                this.setState({isLoading:false});
            });
        } else {
            axios.get(
                `https://petstash-backoffice.herokuapp.com/store/get-products${route}`
            ).then(response => {
                this.setState({
                    products: response.data,
                    isLoading: false
                })
            }).catch(error => {
                console.log("An error occured retrieving category products", error);
                this.setState({isLoading:false});
            });
        }
        this.setState({currentCategory: this.props.match.params.slug});
    }


    componentDidMount() {
        this.getCategoryProducts();
        window.scrollTo(0, 0);
    }

    componentDidUpdate() {
        if (this.props.match.params.slug !== this.state.currentCategory) {
            this.setState({isLoading:true});
            this.getCategoryProducts();
            window.scrollTo(0, 0);
        }
    }


    render() {
        return (
            <div className="page-content">
                <Loader isLoading={this.state.isLoading}/>
                <div className="page__heading">Shop {this.state.currentCategory} products ({this.state.products.length} results found):</div>
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