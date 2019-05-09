// Builds user profile to display on the home page

import React, { Component } from "react"
import { Card, CardImg, CardTitle, CardBody, CardHeader, CardText, Button } from "reactstrap"
import userProfile from "./user-profile.svg"
import "./home.css"

export default class UserProfile extends Component {

    render() {
        return (
            <React.Fragment>
                <Card
                    className="card-first">
                    <CardHeader>My Profile</CardHeader>
                    <CardBody>
                        <CardTitle>
                            <CardImg src={userProfile}
                                className="profile"></CardImg>
                        </CardTitle>
                        <Card
                            className="card-extra-opacity">
                            <CardBody>
                                <CardText>
                                    Username: {this.props.userName}
                                </CardText>
                                <CardText>
                                    Email address: {this.props.email}
                                </CardText>
                                {/* Conditional rendering only if user has user or admin account */}
                                {(parseInt(sessionStorage.getItem("userTypeId")) === 1 || parseInt(sessionStorage.getItem("userTypeId")) === 2) &&
                                    <React.Fragment>
                                        <CardText>
                                            Phone Number: {this.props.phoneNumber}
                                        </CardText>
                                        <CardText>
                                            Password: ******
                        </CardText>
                                    </React.Fragment>
                                }
                            </CardBody>
                        </Card>
                        <Button
                            color="info"
                            className="profile-edit-button"
                            onClick={this.props.handleEdit}
                        >
                            Edit Profile
                                    </Button>
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}