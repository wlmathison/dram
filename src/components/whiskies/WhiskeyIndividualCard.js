// Page build an individual card to display a single whiskey

import React, { Component } from "react"
import { Card, CardBody, CardTitle, CardText } from "reactstrap"

export default class WhiskeyIndividualCard extends Component {
    render() {
        return (
            <React.Fragment>
                <CardBody>
                    <CardTitle>{this.props.whiskey.name}</CardTitle>
                    <CardText></CardText>
                </CardBody>
            </React.Fragment>
        )
    }
}