// Page renders register form, posts new user to API when submitted, and logs in user

import React, { Component } from "react"
import { Form, FormGroup, Label, Input, Button } from "reactstrap"

export default class Register extends Component {

    state = {
        userName: "",
        email: "",
        phoneNumber: "",
        password: "",
        isActive: true,
        userTypeId: 2
    }

    // Function to change state when input field changes
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    // Function to validate all registration form input, save new registered user to database, and direct to home page
    handleRegister = event => {
        event.preventDefault()

        if (this.state.userName === "") {
            window.alert("Please enter a username")
        } else if (this.state.email === "") {
            window.alert("Please enter an email address")
        } else if (this.state.password === "") {
            window.alert("Please enter a password")
        } else if (this.props.users.some(user => {
            return user.userName.toLowerCase() === this.state.userName.toLowerCase()
        })) {
            window.alert("User name is already taken")
        } else if (this.props.users.some(user => {
            return user.email.toLowerCase() === this.state.email.toLowerCase()
        })) {
            window.alert("Email address already exists")
        } else {
            this.props.postNewUser({
                userName: this.state.userName,
                email: this.state.email,
                phoneNumber: this.state.phoneNumber,
                password: this.state.password,
                isActive: this.state.isActive,
                userTypeId: this.state.userTypeId
            }).then(() => {
                let user = this.props.users.find(user => {
                    return user.userName === this.state.userName && user.password === this.state.password
                })
                if (user !== undefined) {
                    sessionStorage.setItem("userId", user.id)
                    sessionStorage.setItem("userName", user.userName)
                    sessionStorage.setItem("userTypeId", user.userTypeId)

                }
            }).then(() => {
                this.props.updateApplicationViewsState()
                this.props.updateUserName()
                this.props.history.push("/home")
            })
        }
    }

    render() {
        return (
            <div
                className="container-div">
                <h3>Register as a new user</h3>
                <Form>
                    <FormGroup>
                        <Label htmlFor="userName">Username</Label>
                        <Input
                            required
                            type="text"
                            id="userName"
                            onChange={this.handleFieldChange}
                            placeholder="Username"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            required
                            type="email"
                            id="email"
                            onChange={this.handleFieldChange}
                            placeholder="name@email.com"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                            required
                            type="text"
                            id="phoneNumber"
                            onChange={this.handleFieldChange}
                            placeholder="+1 234 567 8901"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            required
                            type="password"
                            id="password"
                            onChange={this.handleFieldChange}
                            placeholder="Password"
                        />
                    </FormGroup>
                    <Button
                        color="primary"
                        type="submit"
                        onClick={this.handleRegister}
                    >
                        Register
                </Button>
                </Form>
            </div>
        )
    }
}