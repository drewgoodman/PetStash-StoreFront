import React, { Component } from 'react';
import axios from 'axios';

import ShopProduct from '../shop/shopProduct';

export default class ShopCategory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentCategory: this.props.match.params.slug,
            products: []
        }

        this.getCategoryProducts = this.getCategoryProducts.bind(this)
    }

    getCategoryProducts() {
        const route = this.state.currentCategory === "all" ? "" : `/${this.state.currentCategory}`
        axios.get(
            `https://petstash-backoffice.herokuapp.com/store/get-products${route}`
        ).then(response => {
            this.setState({
                products: response.data
            })
        }).catch(error => {
            console.log("An error occured retrieving category products", error);
        })
    }


    componentDidMount() {
        this.getCategoryProducts();
        window.scrollTo(0, 0);
    }



    render() {
        return (
            <div className="page-content">
                <div className="page__heading">Shop {this.state.currentCategory} products:</div>
                
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