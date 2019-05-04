// Page renders guest form, posts new guest to API when submitted, and logs in guest

import React, { Component } from "react"
import { Form, FormGroup, Label, Input, Button } from "reactstrap"

export default class Guest extends Component {

    state = {
        userName: "",
        email: "",
        isActive: true,
        userTypeId: 3
    }

    // Function to change state when input field changes
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    // Function to validate any registration form input, save new guest user to database, and direct to home page
    handleRegister = event => {
        event.preventDefault()

        if (this.state.userName !== "" && this.props.users.some(user => {
            return user.userName.toLowerCase() === this.state.userName.toLowerCase()
        })) {
            window.alert("User name is already taken")
        } else if (this.state.email !== "" && this.props.users.some(user => {
            return user.email.toLowerCase() === this.state.email.toLowerCase()
        })) {
            window.alert("Email address already exists")
        } else {
            let userName = this.state.userName
            let email = this.state.email

            if (this.state.userName === "") {
                userName = "guest"
            }
            if (this.state.email === "") {
                email = "guest"
            }

            this.props.postNewUser({
                userName: userName,
                email: email,
                isActive: this.state.isActive,
                userTypeId: this.state.userTypeId
            }).then(() => {
                if (userName === "guest") {
                    let users = this.props.users.reverse()
                    let user = users.find(user => {
                        return user.userName === "guest"
                    })
                    sessionStorage.setItem("userId", user.id)
                    sessionStorage.setItem("userName", user.userName)
                    sessionStorage.setItem("userTypeId", user.userTypeId)

                } else {
                    let user = this.props.users.find(user => {
                        return user.userName === this.state.userName && user.password === this.state.password
                    })
                    sessionStorage.setItem("userId", user.id)
                    sessionStorage.setItem("userName", user.userName)
                    sessionStorage.setItem("userTypeId", user.userTypeId)

                }
            }).then(() => {
                this.props.history.push("/home")
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <h3>Register as guest</h3>
                <h5>All information is optional</h5>
                <Form>
                    <FormGroup>
                        <Label htmlFor="userName">Username</Label>
                        <Input
                            type="text"
                            id="userName"
                            onChange={this.handleFieldChange}
                            placeholder="Username"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            type="email"
                            id="email"
                            onChange={this.handleFieldChange}
                            placeholder="name@email.com"
                        />
                    </FormGroup>
                    <Button
                        type="submit"
                        onClick={this.handleRegister}
                    >
                        Register
                </Button>
                </Form>
            </React.Fragment>
        )
    }
}