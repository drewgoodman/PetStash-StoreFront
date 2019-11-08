import React, { Component } from 'react';
import axios from 'axios';
import history from "../../history";

export default class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            errorText: "",
            username: "",
            password: ""
        }

        this.submitForm = this.submitForm.bind(this);
        this.updateForm = this.updateForm.bind(this);
    }

    submitForm(event) {
        event.preventDefault();
        console.log("This works")
        let user_info = {
            username: this.state.username,
            password: this.state.password
        }
        axios.post(
            "https://petstash-backoffice.herokuapp.com/store/login", user_info, { withCredentials: true }
        ).then(response => {
            console.log(response.data);
            if (response.data.loginStatus) {
                history.push('/')
                this.props.handleSuccessfulLogin();
            } else {
                this.setState({
                    errorText: response.data.errorText
                })
            }
        }).catch(error => {
            console.log("An error occured while trying to login", error);
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
            <div>
                {
                    this.state.errorText === "" ? (
                        <div className="form__flash-filler" />
                    ) : (
                            <div className="form__flash-msg">{this.state.errorText}</div>

                        )
                }
                <form className="form" onSubmit={this.submitForm}>
                    <div className="form__row">
                        <div className="form__label">Username</div>
                        <input className="form__field" type="name" name="username" value={this.state.username} placeholder="Username" onChange={this.updateForm} />
                    </div>
                    <div className="form__row">
                        <div className="form__label">Password</div>
                        <input className="form__field" type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.updateForm} />
                    </div>
                    <button className="btn" type="submit">Login to Account</button>
                </form>
            </div>
        )
    }
}