import React, { Component } from 'react';
import axios from 'axios';
import moment from "moment";

import ShippingModal from '../modals/shippingModal'
import OrderModal from '../modals/orderModal'

export default class Account extends Component {
    constructor(props) {
        super(props)

        this.state = {
            shippingModalOpen: false,
            orderModalOpen: false,
            transactionHistory: [],
            user: {},
            currentOrder: {}
        }

        this.fetchTransactionHistory = this.fetchTransactionHistory.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);

        this.openShippingModal = this.openShippingModal.bind(this);
        this.closeShippingModal = this.closeShippingModal.bind(this);

        this.openOrderModal = this.openOrderModal.bind(this);
        this.closeOrderModal = this.closeOrderModal.bind(this);
    }

    fetchTransactionHistory() {
        axios.get(
            "https://petstash-backoffice.herokuapp.com/store/transactions",
            { withCredentials: true }
        ).then(response => {
            this.setState({
                transactionHistory: response.data
            })
            console.log(this.state.transactionHistory)
        }).catch(error => {
            console.log("There was an error in retrieving your cart items", error);
        })
    }


    getUserInfo() {
        axios.get(
            "https://petstash-backoffice.herokuapp.com/store/user",
            { withCredentials: true }
        ).then(response => {
            this.setState({
                user: response.data
            })
            console.log("user found", this.state.user)
        }).catch(error => {
            console.log("Error retrieving user info", error)
        })
    }

    openOrderModal(order_selected) {
        this.setState({
            orderModalOpen: true,
            currentOrder: order_selected
        })
    }

    closeOrderModal() {
        this.setState({
            orderModalOpen: false,
            currentOrder: {}
        })
    }


    openShippingModal() {
        this.setState({
            shippingModalOpen: true
        })
    }

    closeShippingModal() {
        this.setState({
            shippingModalOpen: false
        })
        this.getUserInfo();
    }

    componentDidMount() {
        this.fetchTransactionHistory();
        this.getUserInfo();
    }

    render() {
        return (
            <div>
                <h1></h1>
                <hr />
                <h2>Account Details</h2>
                <div>
                    Name: {this.state.user.user_first_name} {this.state.user.user_last_name}
                </div>
                <div>
                    Email: {this.state.user.user_email}
                </div>
                {
                    this.state.user.user_address ? (
                        <div>
                            <div>
                                Address: {this.state.user.user_address} {this.state.user.user_city}, {this.state.user.user_state} {this.state.user.user_zip}
                            </div>
                            <div>
                                <a  className="btn" onClick={this.openShippingModal}>Change Shipping Address</a>
                            </div>
                        </div>
                    ) : (
                            <div>
                                <a  className="btn" onClick={this.openShippingModal}>Add Shipping Address</a>
                            </div>
                        )
                }

                <hr />
                <h2>Order History</h2>
                {
                    this.state.transactionHistory.map(order => {
                        return (
                            <div key={order.transaction_id}>
                                <h3>{moment(order.transaction_date).format('MMMM Do YYYY, h:mm a')}</h3>
                                ${order.transaction_cost} | {order.transaction_address} {order.transaction_city}, {order.transaction_state} {order.transaction_zip}
                                <div>
                                    <a onClick={() => this.openOrderModal(order)}>View Order Details</a>
                                </div>
                            </div>
                        )
                    })
                }
                <ShippingModal
                    shippingModalOpen={this.state.shippingModalOpen}
                    openShippingModal={this.openShippingModal}
                    closeShippingModal={this.closeShippingModal}
                />
                <OrderModal
                    orderModalOpen={this.state.orderModalOpen}
                    openOrderModal={this.openOrderModal}
                    closeOrderModal={this.closeOrderModal}
                    orderDetails={this.state.currentOrder}
                />
            </div>

        )
    }
}