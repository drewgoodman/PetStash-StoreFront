import React, { Component } from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';

import Loader from "../loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


ReactModal.setAppElement(".app-wrapper");

export default class extends Component {
    constructor(props) {
        super(props)

        this.state = {
            address: "",
            city: "",
            zipcode: "",
            state: "AL",
            errorText: "",
            isLoading: false
        }

        this.customStyles = {
            content: {
                top: "50%",
                left: "50%",
                right: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                height: "400px"
            },
            overlay: {
                backgroundColor: "rgba(1,1,1,0.75)",
                zIndex: 2
            }
        };

        this.updateForm = this.updateForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm() {
        event.preventDefault();
        if (this.state.zipcode.length !== 5) {
            this.setState({
                errorText: "Zip Code must be exactly 5 characters long"
            });
            return;
        }
        if (this.state.address === "" || this.state.city === "") {
            this.setState({
                errorText: "Must include a valid address and city"
            });
            return;
        }
        let user_shipping = {
            address: this.state.address,
            city: this.state.city,
            zipcode: this.state.zipcode,
            state: this.state.state
        }
        this.setState({ isLoading: true });

        axios.post(
            "https://petstash-backoffice.herokuapp.com/store/user/address",
            user_shipping,
            { withCredentials: true }
        ).then(response => {
            this.setState({ isLoading: false });
            alert("Shipping Address has been updated!")
            this.props.closeShippingModal();
            return response;

        }).catch(error => {
            this.setState({ isLoading: false });
            console.log("There was an error updating your shipping", error)
        })

    }

    updateForm(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errorText: ""
        })
    }

    render() {
        return (
            <ReactModal
                onRequestClose={() => {
                    this.props.closeShippingModal();
                }}
                style={this.customStyles}
                isOpen={this.props.shippingModalOpen}
                onAfterOpen={this.getShippingAddress}
            >
                {/* <Loader isLoading={this.state.isLoading}/> */}
                <FontAwesomeIcon onClick={() => this.props.closeShippingModal()} className="form__close-icon" icon="window-close" />
                <div className="page__heading">Shipping Address</div>
                {
                    this.state.errorText === "" ? (
                        <div className="form__flash-filler" />
                    ) : (
                            <div className="form__flash-msg">{this.state.errorText}</div>
                        )
                }

                <form className="form__modal" onSubmit={this.submitForm}>
                    <div className="form__row">
                        <div className="form__label">Address</div>
                        <input className="form__field" type="address" name="address" value={this.state.address} placeholder="Street Address" onChange={this.updateForm} />
                    </div>
                    <div className="form__row">
                        <div className="form__label">City</div>
                        <input className="form__field" type="city" name="city" value={this.state.city} placeholder="City" onChange={this.updateForm} />
                    </div>
                    <div className="form__row">
                        <div className="form__label">Zipcode</div>
                        <input className="form__field" type="zipcode" name="zipcode" value={this.state.zipcode} placeholder="Zipcode" onChange={this.updateForm} />
                    </div>
                    <div className="form__row">
                        <div className="form__label">State</div>
                        <select className="form__field" name="state" value={this.state.state} onChange={this.updateForm}>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                    </div>
                    <div className="page__space30" />
                    <button className="btn" type="submit">Update Shipping Address</button>

                </form>

            </ReactModal>
        )
    }
}