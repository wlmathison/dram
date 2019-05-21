// Page build an individual card to display a single review

import React, { Component } from "react"
import { Card, CardBody, CardTitle, CardText, Button, CardHeader } from "reactstrap"
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import RatingManager from "./../../modules/RatingManager"
import StarRatingComponent from 'react-star-rating-component'

export default class ReviewIndividualCard extends Component {
    state = {
        ratings: []
    }

    componentDidMount() {
        RatingManager.get(`?whiskeyId=${this.props.tastingSelections.find(tastingSelection => tastingSelection.id === this.props.review.tastingSelectionId).whiskey.id}`)
            .then(ratings => {
                let allRatings = ratings.map(rating => rating.rating)
                this.setState({
                    ratings: allRatings
                })
            })
    }

    render() {

        let notGuest = false;
        if (parseInt(sessionStorage.getItem("userTypeId")) === 1 || parseInt(sessionStorage.getItem("userTypeId")) === 2) {
            notGuest = true
        }

        function getSum(total, num) {
            return total + num
        }

        let rating = 0;
        let totalRatings = 0;
        if (this.state.ratings.length > 0) {
            totalRatings = this.state.ratings.length
            rating = this.state.ratings.reduce(getSum) / totalRatings
        }

        let matchingTastingSelection = this.props.tastingSelections.find(tastingSelection => tastingSelection.id === this.props.review.tastingSelectionId)

        let isMyFavorite = this.props.myFavorites.some(favorite => favorite.whiskey.id === matchingTastingSelection.whiskey.id)

        let dateArray = this.props.review.date.split('-')
        dateArray.push(dateArray.shift())
        let date = dateArray.join('/')

        let favoriteId;

        if (isMyFavorite) {
            favoriteId = this.props.myFavorites.find(favorite => favorite.whiskey.id === matchingTastingSelection.whiskey.id).id
        }

        if (parseInt(sessionStorage.getItem("userId")) === this.props.review.user.id) {
            return (
                <React.Fragment>
                    <Card
                        className="card-first">
                        <CardBody>
                            <Card
                                className="card-extra-opacity">
                                <CardBody>
                                    <CardTitle
                                        tag={"h5"}
                                        className="favorites">Whiskey: {matchingTastingSelection.whiskey.name}
                                        {/* Conditionally rendering depending on whether the whiskey has been saved as a favorite or not */}
                                        {isMyFavorite && notGuest &&
                                            <IoIosHeart
                                                id={favoriteId}
                                                color="red"
                                                onClick={() => this.props.handleDeleteFavorite(favoriteId)}
                                            ></IoIosHeart>}
                                        {!isMyFavorite && notGuest &&
                                            <IoIosHeartEmpty
                                                id={matchingTastingSelection.whiskey.id}
                                                onClick={() => this.props.handleAddFavorite(matchingTastingSelection.whiskey.id)}
                                            ></IoIosHeartEmpty>}
                                    </CardTitle>
                                    <div>
                                        <CardText
                                            className="rating-text"
                                        >Average Rating: </CardText>
                                        <div
                                            className="ratings-div"
                                        >{rating.toFixed(2)}                                        <StarRatingComponent
                                                name={"name"}
                                                starCount={5}
                                                value={rating}
                                            />
                                            {`(${totalRatings})`}</div>
                                    </div>
                                    <CardText>Reviewed by: {this.props.review.user.userName}</CardText>
                                    <CardText>At Tasting: {matchingTastingSelection.tasting.theme}</CardText>
                                    <CardText>Date: {date}</CardText>
                                    <CardText>Review: {this.props.review.review}</CardText>
                                    <Button
                                        color="info"
                                        id={`edit-${this.props.review.id}`}
                                        onClick={this.props.handleEdit}
                                    >Edit</Button> {" "}
                                    <Button
                                        id={`delete-${this.props.review.id}`}
                                        color="danger"
                                        onClick={this.props.handleDelete}
                                    >Delete</Button>
                                </CardBody>
                            </Card>
                        </CardBody>
                        <CardHeader></CardHeader>
                    </Card>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Card
                        className="card-first">
                        <CardBody>
                            <Card
                                className="card-extra-opacity">
                                <CardBody>
                                    <CardTitle
                                        tag={"h5"}
                                        className="favorites">Whiskey: {matchingTastingSelection.whiskey.name}
                                        {/* Conditionally rendering depending on whether the whiskey has been saved as a favorite or not */}
                                        {isMyFavorite && notGuest &&
                                            <IoIosHeart
                                                id={favoriteId}
                                                color="red"
                                                onClick={() => this.props.handleDeleteFavorite(favoriteId)}
                                            ></IoIosHeart>}
                                        {!isMyFavorite && notGuest &&
                                            <IoIosHeartEmpty
                                                id={matchingTastingSelection.whiskey.id}
                                                onClick={() => this.props.handleAddFavorite(matchingTastingSelection.whiskey.id)}
                                            ></IoIosHeartEmpty>}
                                    </CardTitle>
                                    <div>
                                        <CardText
                                            className="rating-text"
                                        >Average Rating: </CardText>
                                        <div
                                            className="ratings-div"
                                        >{rating.toFixed(2)}                                        <StarRatingComponent
                                                name={"name"}
                                                starCount={5}
                                                value={rating}
                                            />
                                            {`(${totalRatings})`}</div>
                                    </div>
                                    <CardText>Reviewed by: {this.props.review.user.userName}</CardText>
                                    <CardText>At Tasting: {matchingTastingSelection.tasting.theme}</CardText>
                                    <CardText>Date: {date}</CardText>
                                    <CardText>Review: {this.props.review.review}</CardText>
                                </CardBody>
                            </Card>
                        </CardBody>
                        <CardHeader></CardHeader>
                    </Card>
                </React.Fragment>
            )
        }
    }
}