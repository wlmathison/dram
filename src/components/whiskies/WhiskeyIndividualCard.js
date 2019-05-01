// Page build an individual card to display a single whiskey

import React, { Component } from "react"
import { Card, CardBody, CardTitle, CardText } from "reactstrap"

export default class WhiskeyIndividualCard extends Component {
    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <CardTitle>{this.props.whiskey.name}</CardTitle>
                        <CardText>Size: {this.props.whiskey.size}</CardText>
                        <CardText>Price: ${this.props.whiskey.price}</CardText>
                        <CardText>Proof: {this.props.whiskey.proof}</CardText>
                        <CardText>Age: {this.props.whiskey.age}</CardText>
                        <CardText>Category: {this.props.whiskey.category.name}</CardText>
                        <CardText>Distillery: {this.props.whiskey.distillery.name}</CardText>
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}