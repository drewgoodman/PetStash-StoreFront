import React, { Component } from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';
import { withRouter } from 'react-router';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "../loader";

import CartProduct from '../cart/cartProduct';

ReactModal.setAppElement(".app-wrapper");

class CartModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cartItems: [],
            cartCount: 0,
            cartTotal: 0,
            isLoading: true
        }

        this.customStyles = {
            content: {
                top: "50%",
                left: "50%",
                right: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                maxWidth: "600px",
                minHeight: "430px"
            },
            overlay: {
                backgroundColor: "rgba(1,1,1,0.75)",
                zIndex: 2
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
                isLoading: false,
                cartItems: response.data,
                cartCount: response.data.length
            })
            // console.log(this.state.cartItems)
        }).catch(error => {
            console.log("There was an error in retrieving your cart items", error);
            this.setState({isLoading: false});
        })
    }

    deleteCart() {
        this.setState({isLoading:true});
        axios.delete(
            "https://petstash-backoffice.herokuapp.com/store/cart-delete-all",
            { withCredentials: true }
        ).then(response => {
            this.setState({
                isLoading: false,
                cartItems: [],
                cartCount: 0
            })
        }).catch(error => {
            console.log("There was an error in retrieving your cart items", error);
            this.setState({isLoading: false});
        })
    }

    deleteCartItem(product) {
        this.setState({isLoading:true});
        axios.delete(
            `https://petstash-backoffice.herokuapp.com/store/cart-delete/${product.product_id}`,
            { withCredentials: true }
        ).then(response => {
            this.setState({
                isLoading: false,
                cartCount: this.state.cartCount - 1,
                cartItems: this.state.cartItems.filter(item => {
                    return item.cart_item_id !== product.cart_item_id;
                })
            })
        }).catch(error => {
            console.log("There was an error in retrieving your cart items", error);
            this.setState({isLoading: false});
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
                <Loader isLoading={this.state.isLoading} />
                <FontAwesomeIcon onClick={()=> this.props.closeCartModal()}className="form__close-icon"  icon="window-close" />
                <div className="page__heading">Your Cart</div>
                <div className="page__scroll page__scroll-mediabreak">
                
                {
                    this.state.cartItems.length > 0 ? (
                    this.state.cartItems.map(product => {
                        return <CartProduct key={product.cart_item_id} product={product} deleteCartItem={this.deleteCartItem} />
                    })
                    ) : (
                        <div>No items in your cart.</div>
                    )
                }
                </div>
                {
                    this.state.cartCount > 0 ? (
                        <div className="two-column-btn">
                            <a className="btn" onClick={this.handleCheckoutClick}>Proceed to Checkout</a>
                            <a className="btn" onClick={this.deleteCart}>Clear Cart</a>
                        </div>

                    ) : null
                }

            </ReactModal>
        )
    }
}

export default withRouter(CartModal);