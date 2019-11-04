import React, { Component } from 'react';
import axios from 'axios';

export default class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            errorText: "No error yet",
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
            "https://petstash-backoffice.herokuapp.com/store/login", user_info, {withCredentials: true}
        ).then(response => {
            console.log(response.data);
            if (response.data.loginStatus) {
                this.props.handleSuccessfulLogin();
                alert("Successfully logged in!");
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
                <h2>The form</h2>
                {this.state.errorText}
                <hr />
                <form onSubmit={this.submitForm}>
                    <div>
                        Username
                        <input type="name" name="username" value={this.state.username} placeholder="Username" onChange={this.updateForm} />
                    </div>
                    <div>
                        Password
                        <input type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.updateForm} />
                    </div>
                    <button type="submit">Login to Account</button>
                </form>
            </div>
        )
    }
}