// Builds user profile to display on the home page

import React, { Component } from "react"
import { Card, CardImg, CardTitle, CardBody, CardHeader, CardFooter, CardText, Button } from "reactstrap"

export default class UserProfile extends Component {
    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardImg></CardImg>
                    <CardHeader>My Profile</CardHeader>
                    <CardBody>
                        <CardTitle></CardTitle>
                        <CardText>
                            Name: {this.props.user.userName}
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
                        <Button>Edit Profile</Button>{" "}
                        <Button color="danger" >Deactivate Account</Button>
                    </CardFooter>

                </Card>
            </React.Fragment>
        )
    }
}