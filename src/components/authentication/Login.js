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

        if (this.state.userName === "") {
            window.alert("Please enter a username")
        } else if (this.state.password === "") {
            window.alert("Please enter a password")
        } else if (user !== undefined) {
            if (this.state.rememberMe) {
                localStorage.setItem("userId", user.id)
                localStorage.setItem("userName", user.userName)
                sessionStorage.setItem("userId", user.id)
                sessionStorage.setItem("userName", user.userName)
            } else {
                sessionStorage.setItem("userId", user.id)
                sessionStorage.setItem("userName", user.userName)
            }
            this.props.history.push("/")
        } else {
            window.alert("Username and password do not match")
        }
    }

    render() {
        return (
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
                <FormGroup>
                    <Label htmlFor="rememberMe">Remember Me</Label>
                    <Input
                        type="checkbox"
                        id="rememberMe"
                        onChange={this.handleCheckboxChange}
                    />
                </FormGroup>
                <Button
                    type="submit"
                    onClick={this.handleLogin}
                >
                    Login
                </Button>
            </Form>
        )
    }
}