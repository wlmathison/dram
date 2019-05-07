// Builds user profile to display on the home page

import React, { Component } from "react"
import { Card, CardImg, CardTitle, CardBody, CardHeader, CardFooter, CardText, Button } from "reactstrap"
import userProfile from "./user-profile.png"

export default class UserProfile extends Component {

    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardHeader className="header">My Profile</CardHeader>
                    <CardBody>
                        <CardTitle>
                            <CardImg src={userProfile}
                                className="profile"></CardImg>
                        </CardTitle>
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
                    <CardFooter>
                        <Button
                            onClick={this.props.handleEdit}
                        >
                            Edit Profile
                                    </Button>
                    </CardFooter>
                </Card>
            </React.Fragment>
        )
    }
}