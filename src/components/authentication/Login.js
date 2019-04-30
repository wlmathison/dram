// Page renders login form and when submitted verifies user's information before logging in the user and loading their home page

import React, { Component } from "react"
import { Form, FormGroup, Label, Input, Button } from "reactstrap"

export default class Login extends Component {

    state = {
        userName: "",
        password: "",
        rememberMe: false
    }
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    // Function to verify user has filled in all fields and that userName and password match the database before logging them in and saving to either session storage or local storage if selected
    handleLogin = {

    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label>Username</Label>
                    <Input
                        type="text"
                        id="userName"
                        onChange={this.handleFieldChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input
                        type="text"
                        id="password"
                        onChange={this.handleFieldChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Remember Me</Label>
                    <Input
                        type="checkbox"
                        id="rememberMe"
                        onChange={this.handleFieldChange}
                    />
                </FormGroup>
                <Button>Login</Button>
            </Form>
        )
    }
}