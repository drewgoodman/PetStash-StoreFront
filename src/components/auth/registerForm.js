import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

class RegisterForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            errorText: "",
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            password: "",
            confirm_password: "",
            address: "",
            city: "",
            state: "",
            zip: ""
        }

        this.submitForm = this.submitForm.bind(this);
        this.updateForm = this.updateForm.bind(this);
    }

    submitForm(event) {
        event.preventDefault();
        if (this.state.first_name === "" ||
            this.state.last_name === "" ||
            this.state.username === "" ||
            this.state.email === "") {
            this.setState({ errorText: "You must fill out first name, last name, username, and email." })
        } else if (this.state.password.length < 6) {
            this.setState({ errorText: "Password must be at least 6 characters in length." })
        } else if (this.state.password !== this.state.confirm_password) {
            this.setState({ errorText: "Password must be the same in both fields." })
        } else {
            let user_info = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }
            axios.post(
                "https://petstash-backoffice.herokuapp.com/store/register-user", user_info
            ).then(response => {
                if (response.data.registerSuccess) {
                    alert("User successfully registered!");
                    this.props.history.push("/login");
                } else {
                    alert(response.data.errorText);
                }
            }).catch(error => {
                console.log("An error has occured with user registration", error);
            })
        }
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
                        <div className="form__label">First Name</div>
                        <input className="form__field" type="name" name="first_name" value={this.state.first_name} placeholder="First name" onChange={this.updateForm} />
                    </div>
                    <div className="form__row">
                        <div className="form__label">Last Name</div>
                        <input className="form__field" type="name" name="last_name" value={this.state.last_name} placeholder="Last name" onChange={this.updateForm} />
                    </div>
                    <div className="page__space30" />
                    <div className="form__row">
                        <div className="form__label">Username</div>
                        <input className="form__field" type="name" name="username" value={this.state.username} placeholder="Username" onChange={this.updateForm} />
                    </div>
                    <div className="form__row">
                        <div className="form__label">Email</div>
                        <input className="form__field" type="email" name="email" value={this.state.email} placeholder="E-mail address" onChange={this.updateForm} />
                    </div>
                    <div className="page__space30" />
                    <div className="form__row">
                        <div className="form__label">Password</div>
                        <input className="form__field" type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.updateForm} />
                    </div>
                    <div className="form__row">
                        <div className="form__label">Confirm</div>
                        <input className="form__field" type="password" name="confirm_password" value={this.state.confirm_password} placeholder="Confirm Password" onChange={this.updateForm} />
                    </div>
                    <button className="btn" type="submit">Create Account</button>
                </form>
            </div>
        )
    }
}


export default withRouter(RegisterForm);