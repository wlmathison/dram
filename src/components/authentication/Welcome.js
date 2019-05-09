// Page welcomes uesr and renders links to login, register, or guest page

import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Card, CardBody, CardText, CardHeader } from "reactstrap"

export default class Welcome extends Component {
    render() {
        return (
            <Card
                className="card-search">
                <CardBody>
                    <Card
                        className="card-extra-opacity">
                        <CardBody>
                            <CardText className="welcome-text" tag={"h3"}>Welcome to DRAM</CardText>
                            <CardText
                                className="welcome-text"
                            >Please choose one of the following options.</CardText>
                            <div
                                id="welcome-links">
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                                <Link to="/guest">Use as Guest</Link>
                            </div>
                        </CardBody>
                    </Card>
                </CardBody>
                <CardHeader></CardHeader>
            </Card>
        )
    }
}