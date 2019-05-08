// Page welcomes uesr and renders links to login, register, or guest page

import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Card, CardBody, CardText } from "reactstrap"

export default class Welcome extends Component {
    render() {
        return (
            <Card
                className="card-first">
                <Card
                    className="card">
                    <CardBody>
                        <CardText id="welcome-text" tag={"h3"}>Welcome to dram.</CardText>
                        <CardText>Please choose one of the following options.</CardText>
                        <div
                            id="welcome-links">
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                            <Link to="/guest">Use as Guest</Link>
                        </div>
                    </CardBody>
                </Card>
            </Card>
        )
    }
}