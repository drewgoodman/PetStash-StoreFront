import React, { Component } from 'react';
import ReactModal from 'react-modal';


ReactModal.setAppElement(".app-wrapper");

export default class CartModal extends Component {
    constructor(props) {
        super(props)

        this.customStyles = {
            content: {
                top: "50%",
                left: "50%",
                right: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                width: "800px"
            },
            overlay: {
                backgroundColor: "rgba(1,1,1,0.75)"
            }
        };
    }

    render() {
        return (
            <ReactModal
                onRequestClose={() => {
                    this.props.closeCartModal();
                }}
                style={this.customStyles}
                isOpen={this.props.cartModalOpen}
            >
                <h2>Your cart:</h2>
            </ReactModal>
        )
    }
}