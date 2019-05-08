// Page renders login form and when submitted verifies user's information before logging in the user and loading their home page

import React, { Component } from "react"
import { Form, FormGroup, Label, Input, Button } from "reactstrap"

export default class Login extends Component {

    state = {
        userName: "",
        password: "",
        rememberMe: false
    }

    // Function to change state when input field changes
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    // Function to change state when checkbox clicked
    handleCheckboxChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.checked
        this.setState(stateToChange)
    }

    // Function to verify user has filled in all fields and that userName and password match the database before logging them in and saving to either session storage or local storage if selected
    handleLogin = event => {
        event.preventDefault()

        let user = this.props.users.find(user => {
            return user.userName === this.state.userName && user.password === this.state.password
        })
        if (user === undefined) {
            window.alert("Username and password do not match. Please try again.")
        } else if (user.isActive === false) {
            window.alert("This account has been deactivated. Please contact an administrator.")
        } else if (this.state.userName === "") {
            window.alert("Please enter a username.")
        } else if (this.state.password === "") {
            window.alert("Please enter a password.")
        } else {
            if (this.state.rememberMe) {
                localStorage.setItem("userId", user.id)
                localStorage.setItem("userName", user.userName)
                sessionStorage.setItem("userId", user.id)
                sessionStorage.setItem("userName", user.userName)
                sessionStorage.setItem("userTypeId", user.userTypeId)

            } else {
                sessionStorage.setItem("userId", user.id)
                sessionStorage.setItem("userName", user.userName)
                sessionStorage.setItem("userTypeId", user.userTypeId)
            }
            this.props.updateApplicationViewsState()
            this.props.updateUserName()
            this.props.history.push("/home")
        }
    }

    render() {
        return (
            <div
                className="container-div">
                <h3>Login</h3>
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
                        <Label htmlFor="password">Password</Label>
                        <Input
                            required
                            type="password"
                            id="password"
                            onChange={this.handleFieldChange}
                            placeholder="Password"
                        />
                    </FormGroup>
                    <FormGroup id="remember-me">
                        <label>Remember Me</label>
                        {" "}
                        <input
                            type="checkbox"
                            id="rememberMe"
                            onChange={this.handleCheckboxChange}
                        />
                    </FormGroup>
                    <Button
                        color="primary"
                        type="submit"
                        onClick={this.handleLogin}
                    >
                        Login
                </Button>
                </Form>
            </div>
        )
    }
}