import React, { Component } from 'react';
import axios from 'axios';
import history from "../../history";

import ShippingModal from '../modals/shippingModal';


export default class Checkout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            shippingModalOpen: false,
            address: "",
            city: "",
            state: "",
            zipcode: "",
            cartItems: [],
            errorText: ""
        }

        this.getUserInfo = this.getUserInfo.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);

        this.fetchCartItems = this.fetchCartItems.bind(this);
        this.deleteCart = this.deleteCart.bind(this);

        this.openShippingModal = this.openShippingModal.bind(this);
        this.closeShippingModal = this.closeShippingModal.bind(this);
    }

    getUserInfo() {
        axios.get(
            "https://petstash-backoffice.herokuapp.com/store/user",
            { withCredentials: true }
        ).then(response => {
            if (response.data.user_address) {
                this.setState({
                    address: response.data.user_address,
                    city: response.data.user_city,
                    state: response.data.user_state,
                    zipcode: response.data.user_zip
                })
            } else {
                console.log(response.data, "No address found")

            }
        }).catch(error => {
            console.log("Error retrieving user info", error)
        })
    }

    handleCheckout() {
        if (this.state.address) {
            let product_list = []
            this.state.cartItems.map(item => {
                let item_data = {
                    product_id: item.product_id,
                    product_price: parseFloat(item.shop_product_price),
                    product_qty: item.cart_qty
                }
                product_list.push(item_data)
            })

            let transaction = {
                shipping: {
                    address: this.state.address,
                    city: this.state.city,
                    state: this.state.state,
                    zipcode: this.state.zipcode
                },
                products: product_list
            }
            event.preventDefault();
            console.log(transaction)
            axios.post(
                "https://petstash-backoffice.herokuapp.com/store/transaction/create", transaction, { withCredentials: true }
            ).then(response => {
                console.log(response.data);
                this.deleteCart();
                if (response.data.transactionSuccess) {
                    alert("Transaction placed!")
                    history.push('/account')
                } else {
                    alert("An error has occurred")
                }
            }).catch(error => {
                console.log("An error has occured with creating a transaction", error);
            })
        } else {
            this.setState({
                errorText: "Must have a valid shipping address."
            })
        }
    }


    fetchCartItems() {
        axios.get(
            "https://petstash-backoffice.herokuapp.com/store/cart-fetch",
            { withCredentials: true }
        ).then(response => {
            this.setState({
                cartItems: response.data
            })
            console.log("CartItems", this.state.cartItems)
        }).catch(error => {
            console.log("There was an error in retrieving your cart items", error);
        })
    }

    deleteCart() {
        axios.delete(
            "https://petstash-backoffice.herokuapp.com/store/cart-delete-all",
            { withCredentials: true }
        ).then(response => {
            return response;
        }).catch(error => {
            console.log("There was an error in deleting your cart items", error);
        })
    }

    componentWillMount() {
        console.log("Checkout mounted! Disable shopping cart!")
        this.props.disableCartModal();
        this.getUserInfo();
        this.fetchCartItems();
    }

    componentWillUnmount() {
        console.log("Re-enable shopping cart?")
        this.props.enableCartModal();
    }

    openShippingModal() {
        this.setState({
            shippingModalOpen: true,
            errorText: ""
        })
    }

    closeShippingModal() {
        this.setState({
            shippingModalOpen: false
        })
        this.getUserInfo();
    }


    render() {
        return (
            <div className="page-content">
                <div className="page__heading">Checkout</div>
                <div className="two-column two-column__gap30">
                    <div>
                        <h2>Order Summary</h2>
                        <div className="page__space30" />
                        <div className="page__scroll page__light-bg">
                            {
                                this.state.cartItems.map(product => {
                                    return (
                                        <div className="form__order-summary-item" key={product.cart_item_id}>
                                            <div className="form__order-summary-title">
                                                {product.shop_product_name}
                                            </div>
                                            <div className="form__order-summary-price">
                                                ${product.shop_product_price}
                                            </div>
                                            <div>
                                                ( x{product.cart_qty} )
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <h2>Shipping Address:</h2>
                        <div className="page__space30" />
                        {
                            this.state.address ? (
                                <div>
                                    <div>
                                        {this.state.address}
                                    </div>
                                    <div>
                                        {this.state.city}, {this.state.state} {this.state.zipcode}
                                    </div>
                                </div>
                            ) : (
                                    <div>No Address Set</div>
                                )
                        }
                        <div className="page__space30" />
                        <a className="btn" onClick={this.openShippingModal}>Change Shipping Address</a>
                        {this.state.errorText}
                    </div>
                    <a className="btn-submit" onClick={this.handleCheckout}>Submit Order</a>

                    <ShippingModal
                        shippingModalOpen={this.state.shippingModalOpen}
                        openShippingModal={this.openShippingModal}
                        closeShippingModal={this.closeShippingModal}
                    />
                </div>
            </div>
        )
    }
}