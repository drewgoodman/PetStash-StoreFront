import React, { Component } from 'react';
import axios from 'axios';
import Loader from "../loader";

export default class ShopProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            successfulAdd: false
        }

        this.addProductToCart = this.addProductToCart.bind(this);
        this.resetAddButton = this.resetAddButton.bind(this);
    }


    addProductToCart() {
        if (this.props.loggedInStatus === "LOGGED_IN") {
            let productAdded = {
                product_id: this.props.product.id,
                quantity: 1
            }
            this.setState({isLoading:true});
            axios.post(
                "https://petstash-backoffice.herokuapp.com/store/cart-add",
                productAdded,
                { withCredentials: true }
            ).then(response => {
                this.setState({
                    isLoading: false,
                    successfulAdd: true
                });
                setTimeout(() => {
                    this.resetAddButton();
                }, 1000)
                // alert(`${this.props.product.shop_product_name} successfully added to your cart!`)
            }).catch(error => {
                this.setState({isLoading:false});
                console.log("There was an error updating your cart", error);
            })

        } else {
            alert("You must be logged in to access you cart.")
        }
    }

    resetAddButton() {
        this.setState({
            successfulAdd: false
        })
        document.getElementById(`add-btn-${this.props.product.id}`).classList.add('shop__product-add-refreshed');
    }

    render() {
        return (
            <div className="shop__product-card" data-aos="zoom-in">
                <Loader isLoading={this.state.isLoading}/>
                <div className="shop__product-title">
                    {this.props.product.shop_product_name}

                </div>
                <div className="shop__product-display">
                    <div className="shop__product-image">
                        <img src={this.props.product.shop_product_image_url} />
                    </div>
                    <div className="shop__product-infos">
                        <div className="shop__product-info">
                            ${this.props.product.shop_product_price}
                        </div>
                        <div className="shop__product-info">
                            {this.props.product.shop_product_onhand} in stock
                        </div>

                    </div>

                </div>
                {
                    this.state.successfulAdd ? (
                        <div className="shop__product-added shop__product-add-btn">
                            Added to Cart
                        </div>
                    ) : (
                        <div
                            onClick={this.addProductToCart}
                            id={`add-btn-${this.props.product.id}`}
                            className="shop__product-add shop__product-add-btn">
                            <a>Add Product to Cart</a>
                        </div>
                    )
                }
            </div>
        )
    }
}