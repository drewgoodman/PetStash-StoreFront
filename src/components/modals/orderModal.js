import React, { Component } from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';
import moment from 'moment';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
                width: "1000px",
                minHeight: "400px"
            },
            overlay: {
                backgroundColor: "rgba(1,1,1,0.75)",
                zIndex: 2
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
                <FontAwesomeIcon onClick={()=> this.props.closeOrderModal()}className="form__close-icon"  icon="window-close" />
                <div className="page__heading">Order Details</div>
                <div className="two-column two-column-gap30">
                    <div className="indent">
                        <h3>TRANSACTION DATE:</h3>
                        <div>{moment(this.state.order.transaction_date).format('MMMM Do YYYY, h:mm a')}</div>
                        <div className="page__space30" />
                        <h3>TOTAL:</h3>
                        <div>${this.state.order.transaction_cost}</div>
                        <div className="page__space30" />
                        <h3>SHIPPED TO:</h3>
                        <div>
                            {this.state.order.transaction_address} 
                        </div>
                         <div>
                         {this.state.order.transaction_city}, {this.state.order.transaction_state} {this.state.order.transaction_zipcode}
                        </div>
                    </div>
                    <div>
                        <h3>ITEMS IN ORDER:</h3>
                        <div className="page__space30" />
                        <div className="page__scroll">
                            {
                                this.state.orderItems.map(item => {
                                    return (
                                        <div key={item.id} className="form__order-summary-item">
                                            <div className="form__order-summary-title">
                                                {item.shop_product_name}
                                            </div>
                                            <div className="form__order-summary-price">
                                                ${item.shop_product_price}
                                            </div>
                                            <div>
                                                ( x{item.trans_item_qty} )
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

            </ReactModal>
        )
    }
}