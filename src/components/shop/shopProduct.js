import React, { Component } from 'react';
import axios from 'axios';

export default class ShopProduct extends Component {
    constructor(props) {
        super(props)

        this.addProductToCart = this.addProductToCart.bind(this);
    }


    addProductToCart() {
        if (this.props.loggedInStatus === "LOGGED_IN") {
            let productAdded = {
                product_id: this.props.product.id,
                quantity: 1
            }
            axios.post(
                "https://petstash-backoffice.herokuapp.com/store/cart-add",
                productAdded,
                { withCredentials: true }
            ).then(response => {
                console.log(response.data);
                alert(`${this.props.product.shop_product_name} successfully added to your cart!`)
            }).catch(error => {
                console.log("There was an error updating your cart", error);
            })

        } else {
            alert("You must be logged in to access you cart.")
        }
    }

    render() {
        return (
            <div className="shop__product-card">
                <div className="shop__product-title">
                    {this.props.product.shop_product_name}

                </div>
                <div>
                    <img src={this.props.product.shop_product_image_url} />
                    ${this.props.product.shop_product_price}
                </div>
                <div>
                    {this.props.product.shop_product_onhand} in stock
                </div>
                <div className="shop__product-add">
                    <a onClick={this.addProductToCart}>Add Product to cart</a>
                </div>
            </div>
        )
    }
}