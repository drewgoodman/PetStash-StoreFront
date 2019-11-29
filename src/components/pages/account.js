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
            <div className="page-content two-column two-column__gap30">
                <div>
                    <div className="page__heading">Account Details</div>
                    <div className="page__space30" />
                    <div className="two-column page__row-gap">
                        <div className="page__label">Name</div>
                        <div>
                            {this.state.user.user_first_name} {this.state.user.user_last_name}
                        </div>

                        <div className="page__label">Email</div>
                        <div>
                            {this.state.user.user_email}
                        </div>

                        <div className="page__label">Address</div>

                        {
                            this.state.user.user_address ? (
                                    <div>
                                        {this.state.user.user_address} {this.state.user.user_city}, {this.state.user.user_state} {this.state.user.user_zip}
                                    </div>
                            ) : (
                                <div>No shipping address found.</div>
                                )
                        }
                    </div>
                    <div className="page__space60" />
                    {
                        this.state.user.user_address ? (
                            <div>
                                <a className="btn" onClick={this.openShippingModal}>Change Shipping Address</a>
                            </div>
                        ) : (
                            <div>
                                <a className="btn" onClick={this.openShippingModal}>Add Shipping Address</a>
                            </div>
                        )
                    }

                </div>

                <div>
                    <div className="page__heading">Order History</div>
                    <div className="page__space30" />
                    <div className="page__scroll page__light-bg">
                    {
                        this.state.transactionHistory.map(order => {
                            return (
                                <div className="history-item" key={order.transaction_id}>
                                    <div className="history-item__heading">
                                        <div className="history-item__date">
                                            {moment(order.transaction_date).format('MMMM Do YYYY, h:mm a')}
                                        </div>
                                        <div className="history-item__price">
                                            ${order.transaction_cost}
                                        </div>
                                    </div>
                                    <div className="history-item__row">
                                        <div>
                                            {order.transaction_address}
                                        </div>
                                        <div className="history-item__details" onClick={() => this.openOrderModal(order)}>
                                            <a>View Order Details</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    </div>

                </div>

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