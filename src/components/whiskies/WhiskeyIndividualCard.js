// Page build an individual card to display a single whiskey

import React, { Component } from "react"
import { Card, CardBody, CardTitle, CardText } from "reactstrap"
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import StarRatingComponent from 'react-star-rating-component'
import RatingManager from "./../../modules/RatingManager"

export default class WhiskeyIndividualCard extends Component {

    state = {
        ratings: []
    }

    componentDidMount() {
        RatingManager.get(`?whiskeyId=${this.props.whiskey.id}`)
            .then(ratings => {
                let allRatings = ratings.map(rating => rating.rating)
                this.setState({
                    ratings: allRatings
                })
            })
    }

    render() {
        function getSum(total, num) {
            return total + num
        }

        let rating = 0;
        if (this.state.ratings.length > 0) {
            rating = this.state.ratings.reduce(getSum) / this.state.ratings.length
        }

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
                            <div>
                                <CardText>Average Rating: </CardText>
                                <StarRatingComponent
                                    name={"name"}
                                    starCount={5}
                                    value={rating}
                                />
                            </div>
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
                            <div>
                                <CardText>Rating: </CardText>
                                <StarRatingComponent
                                    name={"name"}
                                    starCount={5}
                                    value={rating}
                                />
                            </div>
                        </CardBody>
                    </Card>
                </React.Fragment>
            )
        }
    }
}