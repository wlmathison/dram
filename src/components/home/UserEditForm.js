// Builds user profile to display on the home page

import React, { Component } from "react"
import { Card, CardImg, CardBody, CardHeader, CardFooter, Button, Form, FormGroup, Label, Input } from "reactstrap"

export default class UserEditForm extends Component {

    render() {
        return (
            <React.Fragment>
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
                                    onChange={this.props.handleFieldChange}
                                    value={this.props.userName}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    required
                                    type="email"
                                    id="email"
                                    onChange={this.props.handleFieldChange}
                                    value={this.props.email}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="phoneNumber">Phone Number</Label>
                                <Input
                                    required
                                    type="text"
                                    id="phoneNumber"
                                    onChange={this.props.handleFieldChange}
                                    value={this.props.phoneNumber}
                                />
                            </FormGroup>
                            {(parseInt(sessionStorage.getItem("userTypeId")) === 1 || parseInt(sessionStorage.getItem("userTypeId")) === 2) && <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    required
                                    type="text"
                                    id="password"
                                    onChange={this.props.handleFieldChange}
                                    value={this.props.password}
                                />
                            </FormGroup>
                            }
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button
                            onClick={this.props.handleCancelEdit}
                        >
                            Cancel
                            </Button>{" "}
                        <Button
                            onClick={this.props.handleSaveEditProfile}
                        >
                            Save Profile
                            </Button>{" "}
                        <Button
                            color="danger"
                            onClick={this.props.handleDeactivateAccount}
                        >
                            Deactivate Account</Button>
                    </CardFooter>
                </Card>
            </React.Fragment>
        )
    }
}