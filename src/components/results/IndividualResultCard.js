// Page builds one individual card to display tasting results of one whiskey

import React, { Component } from "react"
import { Card, CardBody, CardHeader, CardText, CardTitle } from "reactstrap"
import RatingManager from "./../../modules/RatingManager"
import StarRatingComponent from 'react-star-rating-component'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'

export default class IndividualResultCard extends Component {

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

        let whiskey = this.props.whiskies.find(whiskey => whiskey.id === this.props.selection.whiskeyId)

        if (whiskey !== undefined) {
            if (this.props.myFavorites.some(favorite => favorite.whiskey.id === this.props.whiskey.id)) {
                let favoriteId = this.props.myFavorites.find(favorite => favorite.whiskey.id === this.props.whiskey.id).id
                return (
                    <React.Fragment key={this.props.selection.id}>
                        <Card
                            className="card-first">
                            <CardBody>
                                <Card
                                    className="card-extra-opacity">
                                    <CardBody>
                                        <CardTitle
                                            tag={"h5"}
                                            className="favorites">#{this.props.i}: {whiskey.name}
                                            {notGuest && <IoIosHeart
                                                id={favoriteId}
                                                color="red"
                                                onClick={() => this.props.handleDeleteFavorite(favoriteId)}
                                            ></IoIosHeart>
                                            }
                                        </CardTitle>
                                        <div>
                                            <CardText
                                                className="rating-text"
                                            >Average Rating:</CardText>
                                            <div
                                                className="ratings-div"
                                            >{rating.toFixed(2)}                                        <StarRatingComponent
                                                    name={"name"}
                                                    starCount={5}
                                                    value={rating}
                                                />
                                                {`(${totalRatings})`}</div>
                                        </div>
                                        <CardText>Size: {whiskey.size}</CardText>
                                        <CardText>Price: ${whiskey.price}</CardText>
                                        <CardText>Proof: {whiskey.proof}</CardText>
                                        <CardText>Age: {whiskey.age}</CardText>
                                        <CardText>Category: {whiskey.category.name}</CardText>
                                        <CardText>Distillery: {whiskey.distillery.name}</CardText>
                                    </CardBody>
                                </Card>
                            </CardBody>
                            <CardHeader></CardHeader>
                        </Card>
                    </React.Fragment>
                )
            } else {
                return (
                    <React.Fragment key={this.props.selection.id}>
                        <Card
                            className="card-first">
                            <CardBody>
                                <Card
                                    className="card-extra-opacity">
                                    <CardBody>
                                        <CardTitle
                                            tag={"h5"}
                                            className="favorites">#{this.props.i}: {whiskey.name}
                                            {notGuest &&
                                                <IoIosHeartEmpty
                                                    id={this.props.whiskey.id}
                                                    onClick={() => this.props.handleAddFavorite(this.props.whiskey.id)}
                                                ></IoIosHeartEmpty>
                                            }
                                        </CardTitle>
                                        <div>
                                            <CardText
                                                className="rating-text"
                                            >Average Rating:</CardText>
                                            <div
                                                className="ratings-div"
                                            >{rating.toFixed(2)}                                        <StarRatingComponent
                                                    name={"name"}
                                                    starCount={5}
                                                    value={rating}
                                                />
                                                {`(${totalRatings})`}</div>
                                        </div>
                                        <CardText>Size: {whiskey.size}</CardText>
                                        <CardText>Price: ${whiskey.price}</CardText>
                                        <CardText>Proof: {whiskey.proof}</CardText>
                                        <CardText>Age: {whiskey.age}</CardText>
                                        <CardText>Category: {whiskey.category.name}</CardText>
                                        <CardText>Distillery: {whiskey.distillery.name}</CardText>
                                    </CardBody>
                                </Card>
                            </CardBody>
                            <CardHeader></CardHeader>
                        </Card>
                    </React.Fragment>
                )
            }
        }
        else {
            return null
        }
    }
}