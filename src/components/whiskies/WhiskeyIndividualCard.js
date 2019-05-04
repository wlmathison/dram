// Page build an individual card to display a single whiskey

import React, { Component } from "react"
import { Card, CardBody, CardTitle, CardText } from "reactstrap"
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';

export default class WhiskeyIndividualCard extends Component {
    render() {
        if (this.props.myFavorites.some(favorite => favorite.whiskey.id === this.props.whiskey.id)) {
            let favoriteId = this.props.myFavorites.find(favorite => favorite.whiskey.id === this.props.whiskey.id).id
            return (
                <React.Fragment>
                    <Card>
                        <CardBody>
                            <CardTitle>{this.props.whiskey.name}                            <IoIosHeart
                                id={favoriteId}
                                color="red"
                                onClick={() => this.props.handleDeleteFavorite(favoriteId)}
                            ></IoIosHeart>
                            </CardTitle>
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
                            <CardTitle>{this.props.whiskey.name}                            <IoIosHeartEmpty
                                id={this.props.whiskey.id}
                                onClick={() => this.props.handleAddFavorite(this.props.whiskey.id)}
                            ></IoIosHeartEmpty>
                            </CardTitle>
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