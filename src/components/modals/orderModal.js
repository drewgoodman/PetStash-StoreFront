import React, { Component } from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';
import moment from 'moment';


ReactModal.setAppElement(".app-wrapper");

export default class OrderModal extends Component {
    constructor(props) {
        super(props)


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

        this.state = {
            orderItems: [],
            order: {}
        }

        this.fetchTransactionDetails = this.fetchTransactionDetails.bind(this);
    }

    fetchTransactionDetails() {
        axios.get(
            `https://petstash-backoffice.herokuapp.com/store/transaction/items/${this.props.orderDetails.transaction_id}`
        ).then(response => {
            this.setState({
                order: this.props.orderDetails,
                orderItems: response.data
            });
            console.log(response.data);
        }).catch(error => {
            console.log("error while retrieving transaction details", error);
        })
    }


    render() {
        return (

            <ReactModal
                onRequestClose={() => {
                    this.props.closeOrderModal();
                }}
                style={this.customStyles}
                isOpen={this.props.orderModalOpen}
                onAfterOpen={this.fetchTransactionDetails}
            >
                <h1>Order Details</h1>
                <hr />
                <div>
                    <h3>TRANSACTION DATE:</h3>
                    <div>{moment(this.state.order.transaction_date).format('MMMM Do YYYY, h:mm a')}</div>
                    <h3>TOTAL:</h3>
                    <div>${this.state.order.transaction_cost}</div>
                    <h3>SHIPPED TO:</h3>
                    <div>                        
                    {this.state.order.transaction_address} {this.state.order.transaction_city}, {this.state.order.transaction_state} {this.state.order.transaction_zip}
                    </div>
                    <h3>ITEMS IN ORDER:</h3>
                    <div>
                        {
                            this.state.orderItems.map(item => {
                                return (
                                    <div key={item.id}>
                                        {item.shop_product_name} - {item.shop_product_price} (x {item.trans_item_qty})
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </ReactModal>
        )
    }
}