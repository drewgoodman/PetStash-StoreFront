import React, { Component } from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';
import { withRouter } from 'react-router';

import CartProduct from '../cart/cartProduct';

ReactModal.setAppElement(".app-wrapper");

class CartModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cartItems: [],
            cartCount: 0,
            cartTotal: 0
        }

        this.customStyles = {
            content: {
                top: "50%",
                left: "50%",
                right: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                width: "50vw"
            },
            overlay: {
                backgroundColor: "rgba(1,1,1,0.75)"
            }
        };

        this.fetchCartItems = this.fetchCartItems.bind(this)
        this.deleteCart = this.deleteCart.bind(this)
        this.deleteCartItem = this.deleteCartItem.bind(this)
        this.handleCheckoutClick = this.handleCheckoutClick.bind(this)
    }

    fetchCartItems() {
        axios.get(
            "https://petstash-backoffice.herokuapp.com/store/cart-fetch",
            { withCredentials: true }
        ).then(response => {
            this.setState({
                cartItems: response.data,
                cartCount: response.data.length
            })
            console.log(this.state.cartItems)
        }).catch(error => {
            console.log("There was an error in retrieving your cart items", error);
        })
    }

    deleteCart() {
        axios.delete(
            "https://petstash-backoffice.herokuapp.com/store/cart-delete-all",
            { withCredentials: true }
        ).then(response => {
            alert("Cart deleted.")
            this.setState({
                cartItems: [],
                cartCount: 0
            })
        }).catch(error => {
            console.log("There was an error in retrieving your cart items", error);
        })
    }

    deleteCartItem(product) {
        console.log(product.product_id)
        axios.delete(
            `https://petstash-backoffice.herokuapp.com/store/cart-delete/${product.product_id}`,
            { withCredentials: true }
        ).then(response => {
            alert("Cart item deleted.")
            this.setState({
                cartItems: this.state.cartItems.filter(item => {
                    return item.cart_item_id !== product.cart_item_id;
                })
            })
        }).catch(error => {
            console.log("There was an error in retrieving your cart items", error);
        })
    }

    handleCheckoutClick() {
        this.props.history.push("/checkout");
        this.props.closeCartModal();
    }

    render() {
        return (
            <ReactModal
                onRequestClose={() => {
                    this.props.closeCartModal();
                }}
                style={this.customStyles}
                isOpen={this.props.cartModalOpen}
                onAfterOpen={this.fetchCartItems}
            >
                <h2>Your cart:</h2>
                {
                    this.state.cartItems.map(product => {
                        return <CartProduct key={product.cart_item_id} product={product} deleteCartItem={this.deleteCartItem} />
                    })
                }
                <hr />
                {
                    this.state.cartCount > 0 ? (
                        <div>
                            <a onClick={this.handleCheckoutClick}>Proceed to Checkout</a> | 
                            <a onClick={this.deleteCart}>Clear Cart</a>
                        </div>

                    ) : null
                }

            </ReactModal>
        )
    }
}

export default withRouter(CartModal);