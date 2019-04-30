// Builds user profile to display on the home page

import React, { Component } from "react"
import { Card, CardImg, CardTitle, CardBody, CardHeader, CardFooter, CardText, Button, Form, FormGroup, Label, Input } from "reactstrap"
import UserManager from "./../../modules/UserManager"

export default class UserProfile extends Component {

    state = {
        userName: "",
        email: "",
        phoneNumber: "",
        password: "",
        isActive: true,
        editUser: false
    }

    // Function to change state when edit input field changes
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    // Function to change state of editUser to true, udate state with props, and conditionally render edit form
    handleEdit = event => {
        this.setState({
            editUser: true,
            userName: this.props.user.userName,
            email: this.props.user.email,
            phoneNumber: this.props.user.phoneNumber,
            password: this.props.user.password
        })
    }

    handleDeactivateAccount = event => {
        this.setState({
            isActive: false,
            editUser: false
        }).then()
    }

    handleSaveEditProfile = event => {
        this.setState({
            editUser: false
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.editUser ? (
                    <Card>
                        <CardImg></CardImg>
                        <CardHeader>Edit Profile</CardHeader>
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <Label>Username:</Label>
                                    <Input
                                        required
                                        type="text"
                                        id="userName"
                                        onChange={this.handleFieldChange}
                                        value={this.state.userName}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        required
                                        type="email"
                                        id="email"
                                        onChange={this.handleFieldChange}
                                        value={this.state.email}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="phoneNumber">Phone Number</Label>
                                    <Input
                                        required
                                        type="text"
                                        id="phoneNumber"
                                        onChange={this.handleFieldChange}
                                        value={this.state.phoneNumber}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        required
                                        type="text"
                                        id="password"
                                        onChange={this.handleFieldChange}
                                        value={this.state.password}
                                    />
                                </FormGroup>
                            </Form>
                        </CardBody>
                        <CardFooter>
                            <Button
                                onClick={this.handleSaveEditProfile}
                            >
                                Save Profile
                            </Button>{" "}
                            <Button
                                color="danger"
                                onClick={this.handleDeactivateAccount}
                            >
                                Deactivate Account</Button>
                        </CardFooter>
                    </Card>
                ) : (
                        <Card>
                            <CardImg></CardImg>
                            <CardHeader>My Profile</CardHeader>
                            <CardBody>
                                <CardTitle></CardTitle>
                                <CardText>
                                    Username: {this.props.user.userName}
                                </CardText>
                                <CardText>
                                    Email address: {this.props.user.email}
                                </CardText>
                                <CardText>
                                    Phone Number: {this.props.user.phoneNumber}
                                </CardText>
                                <CardText>
                                    Password: ******
                                </CardText>
                            </CardBody>
                            <CardFooter>
                                <Button
                                    onClick={this.handleEdit}
                                >
                                    Edit Profile
                                    </Button>
                            </CardFooter>
                        </Card>
                    )}
            </React.Fragment>
        )
    }
}

