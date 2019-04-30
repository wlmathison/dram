// Builds user profile to display on the home page

import React, { Component } from "react"
import { Card, CardImg, CardTitle, CardBody, CardHeader, CardFooter, CardText, Button } from "reactstrap"

export default class UserProfile extends Component {

    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>My Profile</CardHeader>
                    <CardBody>
                        <CardTitle>                    <CardImg src="http://www.clker.com/cliparts/5/7/4/8/13099629981030824019profile.svg.med.png"></CardImg></CardTitle>
                        <CardText>
                            Username: {this.props.userName}
                        </CardText>
                        <CardText>
                            Email address: {this.props.email}
                        </CardText>
                        <CardText>
                            Phone Number: {this.props.phoneNumber}
                        </CardText>
                        <CardText>
                            Password: ******
                        </CardText>
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