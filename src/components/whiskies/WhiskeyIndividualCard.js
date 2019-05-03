// Page build an individual card to display a single whiskey

import React, { Component } from "react"
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap"

export default class WhiskeyIndividualCard extends Component {
    render() {
        if (this.props.myFavorites.some(favorite => favorite.whiskey.id === this.props.whiskey.id)) {
            let favoriteId = this.props.myFavorites.find(favorite => favorite.whiskey.id === this.props.whiskey.id).id
            return (
                <React.Fragment>
                    <Card>
                        <CardBody>
                            <CardTitle>{this.props.whiskey.name}</CardTitle>
                            < Button
                                id={favoriteId}
                                onClick={this.props.handleDeleteFavorite}
                            > Delete</Button >
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
        } else {
            return (
                <React.Fragment>
                    <Card>
                        <CardBody>
                            <CardTitle>{this.props.whiskey.name}</CardTitle>
                            < Button
                                id={this.props.whiskey.id}
                                onClick={this.props.handleAddFavorite}
                            > Add</Button >
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
}