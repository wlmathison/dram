// Builds user profile to display on the home page

import React, { Component } from "react"
import { Card, CardBody, CardHeader, Button, Form, FormGroup, Label, Input } from "reactstrap"

export default class UserEditForm extends Component {

    render() {
        return (
            <React.Fragment>
                <Card
                    className="card-first">
                    <CardHeader>Edit Profile</CardHeader>
                    <Card
                        className="card-edit-extra-opacity">
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
                                {/* Conditional rendering only if user has user or admin account */}
                                {(parseInt(sessionStorage.getItem("userTypeId")) === 1 || parseInt(sessionStorage.getItem("userTypeId")) === 2) &&
                                    <React.Fragment>
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
                                        <FormGroup>
                                            <Label htmlFor="password">Password</Label>
                                            <Input
                                                required
                                                type="text"
                                                id="password"
                                                onChange={this.props.handleFieldChange}
                                                value={this.props.password}
                                            />
                                        </FormGroup>
                                    </React.Fragment>
                                }
                            </Form>
                            <Button
                                className="profile-edit-button"
                                onClick={this.props.handleCancelEdit}
                            >
                                Cancel
                            </Button>{" "}
                            <Button
                            color="success"
                                className="profile-edit-button"
                                onClick={this.props.handleSaveEditProfile}
                            >
                                Save Profile
                            </Button>{" "}
                            <Button
                                className="profile-edit-button"
                                color="danger"
                                onClick={this.props.handleDeactivateAccount}
                            >
                                Deactivate Account</Button>
                        </CardBody>
                    </Card>
                </Card>
            </React.Fragment>
        )
    }
}